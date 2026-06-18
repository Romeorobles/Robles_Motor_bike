import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario_id: string;

  @Column()
  moto_id: string;

  @Column()
  fecha_venta: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_venta: number;

  @Column()
  metodo_pago: string;

  @Column({ nullable: true })
  cuotas: number;

  @Column()
  estado: string;
}
