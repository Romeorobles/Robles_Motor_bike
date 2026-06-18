import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Moto } from './moto.entity';
import { CreateMotoDto } from './dto/create-moto.dto';
import { UpdateMotoDto } from './dto/update-moto.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class MotosService {
  constructor(
    @InjectRepository(Moto)
    private readonly repository: Repository<Moto>,
  ) {}

  async create(dto: CreateMotoDto): Promise<Moto | null> {
    try {
      const moto = this.repository.create(dto);
      return await this.repository.save(moto);
    } catch (err) {
      console.error('Error creating moto:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<Moto> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;

      const query = this.repository.createQueryBuilder('moto');

      if (search) {
        if (searchField) {
          if (searchField === 'modelo') {
            query.where('moto.modelo ILIKE :search', {
              search: `%${search}%`,
            });
          }
        } else {
          query.where('moto.modelo ILIKE :search', {
            search: `%${search}%`,
          });
        }
      }

      if (sort) {
        const validFields = ['modelo', 'anio', 'precio', 'stock'];
        const sortField = validFields.includes(sort) ? sort : 'modelo';
        const sortOrder = order === 'ASC' || order === 'DESC' ? order : 'ASC';
        query.orderBy(`moto.${sortField}`, sortOrder);
      }

      return await paginate<Moto>(query, { page, limit });
    } catch (err) {
      console.error('Error fetching motos:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Moto | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateMotoDto): Promise<Moto | null> {
    const entity = await this.findOne(id);
    if (!entity) return null;
    Object.assign(entity, dto);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<Moto | null> {
    const entity = await this.findOne(id);
    if (!entity) return null;
    return await this.repository.remove(entity);
  }
}
