import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TipoMotor } from './tipo-motor.entity';
import { CreateTipoMotorDto } from './dto/create-tipo-motor.dto';
import { UpdateTipoMotorDto } from './dto/update-tipo-motor.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class TipoMotorService {
  constructor(
    @InjectRepository(TipoMotor)
    private readonly repository: Repository<TipoMotor>,
  ) {}

  async create(dto: CreateTipoMotorDto): Promise<TipoMotor | null> {
    try {
      const tipoMotor = this.repository.create(dto);
      return await this.repository.save(tipoMotor);
    } catch (err) {
      console.error('Error creating tipo de motor:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<TipoMotor> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;

      const query = this.repository.createQueryBuilder('tipo_motor');

      if (search) {
        if (searchField) {
          if (searchField === 'nombre') {
            query.where('tipo_motor.nombre ILIKE :search', {
              search: `%${search}%`,
            });
          }
        } else {
          query.where('tipo_motor.nombre ILIKE :search', {
            search: `%${search}%`,
          });
        }
      }

      if (sort) {
        const sortField = sort === 'nombre' ? sort : 'nombre';
        const sortOrder = order === 'ASC' || order === 'DESC' ? order : 'ASC';
        query.orderBy(`tipo_motor.${sortField}`, sortOrder);
      }

      return await paginate<TipoMotor>(query, { page, limit });
    } catch (err) {
      console.error('Error fetching tipos de motor:', err);
      return null;
    }
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateTipoMotorDto) {
    const entity = await this.findOne(id);
    if (!entity) return null;
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    if (!entity) return null;
    return this.repository.remove(entity);
  }
}
