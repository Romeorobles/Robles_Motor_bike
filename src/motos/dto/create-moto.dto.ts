import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMotoDto {
  @IsNotEmpty()
  @IsString()
  modelo: string;

  @IsOptional()
  @IsString()
  marca_id?: string;

  @IsOptional()
  @IsNumber()
  anio?: number;

  @IsOptional()
  @IsNumber()
  cilindraje?: number;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  categoria_id?: string;

  @IsOptional()
  @IsString()
  tipo_motor_id?: string;

  @IsOptional()
  @IsString()
  estado_id?: string;

  @IsOptional()
  @IsString()
  imagen_url?: string;
}
