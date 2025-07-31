import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Lease } from '../lease/lease.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Lease, (lease) => lease.payments, { nullable: false })
  // lease: Lease;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;
}
