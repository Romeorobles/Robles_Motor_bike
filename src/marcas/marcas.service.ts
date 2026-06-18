import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Marca } from './marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly repository: Repository<Marca>,
  ) {}

  async create(dto: CreateMarcaDto): Promise<Marca | null> {
    try {
      const marca = this.repository.create(dto);
      return await this.repository.save(marca);
    } catch (err) {
      console.error('Error creating marca:', err);
      return null;
    }
  }

  async findAll(queryDto: QueryDto): Promise<Pagination<Marca> | null> {
    try {
      const { page, limit, search, searchField, sort, order } = queryDto;

      const query = this.repository.createQueryBuilder('marca');

      if (search) {
        if (searchField) {
          switch (searchField) {
            case 'nombre':
              query.where('marca.nombre ILIKE :search', {
                search: `%${search}%`,
              });
              break;
            case 'pais':
              query.where('marca.pais ILIKE :search', {
                search: `%${search}%`,
              });
              break;
            default:
              query.where(
                '(marca.nombre ILIKE :search OR marca.pais ILIKE :search)',
                { search: `%${search}%` },
              );
          }
        } else {
          query.where(
            '(marca.nombre ILIKE :search OR marca.pais ILIKE :search)',
            { search: `%${search}%` },
          );
        }
      }

      if (sort) {
        const sortField = sort === 'nombre' || sort === 'pais' ? sort : 'nombre';
        const sortOrder = order === 'ASC' || order === 'DESC' ? order : 'ASC';
        query.orderBy(`marca.${sortField}`, sortOrder);
      }

      return await paginate<Marca>(query, { page, limit });
    } catch (err) {
      console.error('Error fetching marcas:', err);
      return null;
    }
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateMarcaDto) {
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
