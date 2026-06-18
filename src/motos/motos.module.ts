import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotosController } from './motos.controller';
import { MotosService } from './motos.service';
import { Moto } from './moto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moto])],
  controllers: [MotosController],
  providers: [MotosService]
})
export class MotosModule {}
