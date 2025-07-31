import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Unit } from '../units/entities/unit.entity';
import { User } from '../iam/users/entities/user.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  notes: string;

  // @ManyToOne(() => Unit, unit => unit.sales, { nullable: false })
  // unit: Unit;

  @ManyToOne(() => User, user => user.sales, { nullable: false })
  buyer: User;

  @CreateDateColumn()
  createdAt: Date;
}
