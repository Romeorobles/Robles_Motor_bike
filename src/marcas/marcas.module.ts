import { Module } from '@nestjs/common';
import { MarcasController } from './marcas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './marca.entity';
import { MarcasService } from './marcas.service';


@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  controllers: [MarcasController],
  providers: [MarcasService]
})
export class MarcasModule {}
