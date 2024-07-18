export class CreateIndicacionDto {
  titulo: string;
  texto: string;
  userId: number;
}

export class UpdateIndicacionDto {
  titulo?: string;
  texto?: string;
}