import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEstadoMotoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
