import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateVentaDto {
  @IsString()
  usuario_id: string;

  @IsString()
  moto_id: string;

  @IsNotEmpty()
  fecha_venta: Date;

  @IsNotEmpty()
  @IsNumber()
  precio_venta: number;

  @IsString()
  metodo_pago: string;

  @IsOptional()
  @IsNumber()
  cuotas?: number;

  @IsString()
  estado: string;
}
