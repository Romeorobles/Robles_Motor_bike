import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('marcas')
export class Marca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  pais: string;
}
