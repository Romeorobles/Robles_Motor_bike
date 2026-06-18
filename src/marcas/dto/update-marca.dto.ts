import { IsOptional, IsString } from 'class-validator';

export class UpdateMarcaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  pais?: string;
}
