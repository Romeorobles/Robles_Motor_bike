import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReservaDto {
  @IsString()
  usuario_id: string;

  @IsString()
  moto_id: string;

  @IsNotEmpty()
  fecha_reserva: Date;

  @IsString()
  estado: string;
}
