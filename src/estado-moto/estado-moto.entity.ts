import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estado_moto')
export class EstadoMoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;
}
