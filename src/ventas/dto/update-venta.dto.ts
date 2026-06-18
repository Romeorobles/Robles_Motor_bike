import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateVentaDto {
  @IsOptional()
  @IsNumber()
  precio_venta?: number;

  @IsOptional()
  @IsString()
  metodo_pago?: string;

  @IsOptional()
  @IsNumber()
  cuotas?: number;

  @IsOptional()
  @IsString()
  estado?: string;
}
