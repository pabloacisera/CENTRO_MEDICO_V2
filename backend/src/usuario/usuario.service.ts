import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Login, LoginAdmin } from './dto/login-usuario.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsuarioService {
  private readonly jwtSecret: string;

  constructor(
    private readonly servicio: PrismaService, private readonly jwtService: JwtService
  ) {
    this.jwtSecret = process.env.JWT_SECRET || 'other key'
    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET is not set in config.json');
    }
  }

  async create(usuario: CreateUsuarioDto): Promise<any> {
    const datosDeUsuario = {
      rol: usuario.rol,
      area: usuario.area,
      nombre: usuario.nombre,
      email: usuario.email,
      password: await bcrypt.hash(usuario.password, 10),
    };
    const usuarioCreado = await this.servicio.usuario.create({
      data: datosDeUsuario,
    });

    const token = this.jwtService.sign(
      {
        id: usuarioCreado.id,
        nombre: usuarioCreado.nombre,
        email: usuarioCreado.email,
      },
      { secret: this.jwtSecret, expiresIn: '1d' },
    );

    return { data: usuarioCreado, token };
  }

  async login(data: Login): Promise<any> {
    const { email, password } = data;
    const usuarioEncontrado = await this.servicio.usuario.findUnique({
      where: { email: email },
    });
    if (!usuarioEncontrado) {
      throw new UnauthorizedException('Error en el proceso de logeo');
    }
    const verificarContraseña = await bcrypt.compare(
      password,
      usuarioEncontrado.password,
    );
    if (!verificarContraseña) {
      throw new UnauthorizedException('Error en el proceso de logeo');
    }
    const token = this.jwtService.sign(
      {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
      },
      { secret: this.jwtSecret, expiresIn: '1d' },
    );

    return { data: usuarioEncontrado, token };
  }

  async loginAdministrativos(data: Login): Promise<any> {
    const { email, password } = data;
    const usuarioEncontrado = await this.servicio.usuario.findUnique({
      where: { email: email },
    });

    if (!usuarioEncontrado) {
      throw new UnauthorizedException('Error en el proceso de logeo');
    }

    const verificarContraseña = await bcrypt.compare(
      password,
      usuarioEncontrado.password,
    );

    if (!verificarContraseña) {
      throw new UnauthorizedException('Error en el proceso de logeo');
    }

    // Verificar el rol del usuario
    if (usuarioEncontrado.rol !== 'administrativo') {
      throw new UnauthorizedException('Acceso denegado. El usuario no tiene permisos administrativos.');
    }

    // Generar el token JWT

    const token = this.jwtService.sign({
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
      rol: usuarioEncontrado.rol,
    }, { secret: this.jwtSecret, expiresIn: '1d' });

    return { data: usuarioEncontrado, token };
  }

  /**obtener autorizacion y actualizar la contraseña */

  async recuperarContraseña(data: { email: string, rol: string }) {
    const usuario = await this.servicio.usuario.findUnique({
      where: {
        email: data.email,
      }
    });
  
    if (!usuario) {
      throw new NotFoundException('Email no encontrado');
    }
  
    return { success: usuario.rol === 'profesional', data: usuario }; // Devuelve un objeto con `success`
  }

  async actualizarContraseña(id: number, nuevaContraseña: string): Promise<void> {
    const usuario = await this.servicio.usuario.findUnique({
      where: { id: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
    await this.servicio.usuario.update({
      where: { id: id },
      data: { password: hashedPassword },
    });
  }
  
  /********************************************* */

  async findAll(): Promise<any> {
    return await this.servicio.usuario.findMany({
      where: {
        rol: 'profesional'
      }
    });
  }

  async findAllExcept(userId: number) {
    return await this.servicio.usuario.findMany({
      where: {
        id: {
          not: parseInt(userId as any)  // Asegúrate de que userId sea un número
        }
      }
    });
  }

  async FindAllForAdmin(): Promise<any> {
    return await this.servicio.usuario.findMany()
  }

  async findOne(id: number): Promise<any> {
    const usuario = await this.servicio.usuario.findUnique({
      where: { id: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<any> {
    const usuario = await this.servicio.usuario.findUnique({
      where: { id: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return await this.servicio.usuario.update({
      where: { id: id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number): Promise<any> {
    const usuario = await this.servicio.usuario.findUnique({
      where: { id: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return await this.servicio.usuario.delete({
      where: { id: id },
    });
  }
}
