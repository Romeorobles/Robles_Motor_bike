import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { EstadoMoto } from './estado-moto.entity';
import { CreateEstadoMotoDto } from './dto/create-estado-moto.dto';
import { UpdateEstadoMotoDto } from './dto/update-estado-moto.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class EstadoMotoService {
  constructor(
    @InjectRepository(EstadoMoto)
    private readonly repository: Repository<EstadoMoto>,
  ) {}

  async create(dto: CreateEstadoMotoDto): Promise<EstadoMoto | null> {
    try {
      const estadoMoto = this.repository.create(dto);
      return await this.repository.save(estadoMoto);
    } catch (err) {
      console.error('Error creating estado de moto:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<EstadoMoto> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;

      const query = this.repository.createQueryBuilder('estado_moto');

      if (search) {
        if (searchField) {
          if (searchField === 'nombre') {
            query.where('estado_moto.nombre ILIKE :search', {
              search: `%${search}%`,
            });
          }
        } else {
          query.where('estado_moto.nombre ILIKE :search', {
            search: `%${search}%`,
          });
        }
      }

      if (sort) {
        const sortField = sort === 'nombre' ? sort : 'nombre';
        const sortOrder = order === 'ASC' || order === 'DESC' ? order : 'ASC';
        query.orderBy(`estado_moto.${sortField}`, sortOrder);
      }

      return await paginate<EstadoMoto>(query, { page, limit });
    } catch (err) {
      console.error('Error fetching estados de moto:', err);
      return null;
    }
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateEstadoMotoDto) {
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
