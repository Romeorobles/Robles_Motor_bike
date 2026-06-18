import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateMotoDto {
  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsString()
  marca_id?: string;

  @IsOptional()
  @IsNumber()
  anio?: number;

  @IsOptional()
  @IsNumber()
  cilindraje?: number;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

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
