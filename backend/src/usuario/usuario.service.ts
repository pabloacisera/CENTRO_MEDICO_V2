import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Login } from './dto/login-usuario.dto';

const jwtSecret = process.env.JWT_SECRET;

@Injectable()
export class UsuarioService {
  constructor(private readonly servicio: PrismaService) {}

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

    const token = jwt.sign(
      {
        id: usuarioCreado.id,
        nombre: usuarioCreado.nombre,
        email: usuarioCreado.email,
      },
      jwtSecret,
      { expiresIn: '1d' },
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
    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
      },
      jwtSecret,
      { expiresIn: '1d' },
    );

    return { data: usuarioEncontrado, token };
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
