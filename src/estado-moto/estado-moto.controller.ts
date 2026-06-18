import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, NotFoundException, InternalServerErrorException,
  UseGuards
} from '@nestjs/common';
import { EstadoMotoService } from './estado-moto.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateEstadoMotoDto } from './dto/create-estado-moto.dto';
import { UpdateEstadoMotoDto } from './dto/update-estado-moto.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EstadoMoto } from './estado-moto.entity';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('estado-moto')
export class EstadoMotoController {
  constructor(private readonly service: EstadoMotoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() dto: CreateEstadoMotoDto) {
    const estadoMoto = await this.service.create(dto);
    if (!estadoMoto) throw new InternalServerErrorException('Failed to create estado de moto');
    return new SuccessResponseDto('Estado de moto created successfully', estadoMoto);
  }

  @Get()
  async findAll(
    @Query() query: QueryDto,
  ): Promise<SuccessResponseDto<Pagination<EstadoMoto>>> {
    if (query.limit && query.limit > 100) {
      query.limit = 100;
    }

    const result = await this.service.findAll(query);

    if (!result) throw new InternalServerErrorException('Could not retrieve estados de moto');

    return new SuccessResponseDto('Estados de moto retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const estadoMoto = await this.service.findOne(id);
    if (!estadoMoto) throw new NotFoundException('Estado de moto not found');
    return new SuccessResponseDto('Estado de moto retrieved successfully', estadoMoto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEstadoMotoDto) {
    const estadoMoto = await this.service.update(id, dto);
    if (!estadoMoto) throw new NotFoundException('Estado de moto not found');
    return new SuccessResponseDto('Estado de moto updated successfully', estadoMoto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const estadoMoto = await this.service.remove(id);
    if (!estadoMoto) throw new NotFoundException('Estado de moto not found');
    return new SuccessResponseDto('Estado de moto deleted successfully', estadoMoto);
  }
}
