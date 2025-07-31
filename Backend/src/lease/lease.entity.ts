import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Lease extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  leaseId: string;

  @Column()
  property: string;

  @Column()
  unit: string;

  @Column()
  address: string;

  @Column()
  tenant: string;

  @Column()
  landlord: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column()
  monthlyRent: number;

  @Column()
  deposit: number;

  @Column()
  status: string;

  @Column({ default: true })
  renewalOption: boolean;

  @Column()
  noticePeriod: number;

  @Column()
  lateFeePenalty: number;

  @Column("text", { array: true })
  leaseTerms: string[];

  @Column("jsonb")
  paymentSchedule: {
    month: string;
    amount: number;
    status: string;
    date: string;
  }[];
}
