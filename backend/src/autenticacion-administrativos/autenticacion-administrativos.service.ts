import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAutenticacionAdministrativoDto } from './dto/create-autenticacion-administrativo.dto';
import { UpdateAutenticacionAdministrativoDto } from './dto/update-autenticacion-administrativo.dto'
import { Usuario } from '@prisma/client'; // Asegúrate de tener el modelo Usuario importado
import * as bcrypt from 'bcrypt'; 
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { AuthenticatedUserResponse } from './autenticacion.interface';

@Injectable()
export class AutenticacionAdministrativosService {
  
  constructor(private readonly prisma: PrismaService) {} // Asumiendo que tienes un servicio Prisma para interactuar con la base de datos

  async authenticate(email: string, password: string): Promise<AuthenticatedUserResponse> {
    // 1. Verificar si el usuario existe y es un administrativo
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Email o contraseña incorrectos.');
    }

    if (usuario.rol !== 'administrativo') {
      throw new UnauthorizedException('El usuario no tiene el rol adecuado.');
    }

    // 2. Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email o contraseña incorrectos.');
    }

    // 3. Autenticación exitosa, devolver los datos del usuario
    return { user: usuario };
  }

   /**obtener autorizacion y actualizar la contraseña */

   async recuperarContraseña(data: { email: string, rol: string }) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: data.email,
      }
    });
  
    if (!usuario) {
      throw new NotFoundException('Email no encontrado');
    }
  
    return { success: usuario.rol === 'administrativo', data: usuario }; // Devuelve un objeto con `success`
  }

  async actualizarContraseña(id: number, nuevaContraseña: string): Promise<void> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
    await this.prisma.usuario.update({
      where: { id: id },
      data: { password: hashedPassword },
    });
  }
  
  /********************************************* */

  create(createAutenticacionAdministrativoDto: CreateAutenticacionAdministrativoDto) {
    return 'This action adds a new autenticacionAdministrativo';
  }

  findAll() {
    return `This action returns all autenticacionAdministrativos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autenticacionAdministrativo`;
  }

  update(id: number, updateAutenticacionAdministrativoDto: UpdateAutenticacionAdministrativoDto) {
    return `This action updates a #${id} autenticacionAdministrativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} autenticacionAdministrativo`;
  }
}
