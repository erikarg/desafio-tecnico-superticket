import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ServiceOrderStatus {
  CREATED = 'CREATED',
  DELEGATED = 'DELEGATED',
  FINISHED = 'FINISHED',
}

@Entity()
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  title: string;

  @Column('varchar', { length: 500 })
  description: string;

  @Column()
  status: ServiceOrderStatus;

  @Column({ nullable: true })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
