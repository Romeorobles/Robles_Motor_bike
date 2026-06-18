import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoMotorDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
