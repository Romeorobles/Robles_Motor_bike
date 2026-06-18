import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_motor')
export class TipoMotor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;
}
