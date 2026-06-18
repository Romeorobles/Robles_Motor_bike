import { Module } from '@nestjs/common';
import { EstadoMotoController } from './estado-moto.controller';
import { EstadoMotoService } from './estado-moto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoMoto } from './estado-moto.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EstadoMoto])],
  controllers: [EstadoMotoController],
  providers: [EstadoMotoService]
})
export class EstadoMotoModule {}
