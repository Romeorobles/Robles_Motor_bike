import { Module } from '@nestjs/common';
import { TipoMotorController } from './tipo-motor.controller';
import { TipoMotorService } from './tipo-motor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMotor } from './tipo-motor.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TipoMotor])],
  controllers: [TipoMotorController],
  providers: [TipoMotorService]
})
export class TipoMotorModule {}
