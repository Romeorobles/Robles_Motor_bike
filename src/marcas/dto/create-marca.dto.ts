import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMarcaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  pais: string;
}
