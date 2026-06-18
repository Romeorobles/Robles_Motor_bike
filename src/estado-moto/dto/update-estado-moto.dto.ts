import { IsOptional, IsString } from 'class-validator';

export class UpdateEstadoMotoDto {
  @IsOptional()
  @IsString()
  nombre?: string;
}
