import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Property } from '../../properties/entities/property.entity';
import { UnitStatus } from '../../shared/enums/unit-status.enum';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitNumber: string;

  @Column({ default: false })
  occupied: boolean;

  @Column({ type: 'enum', enum: UnitStatus, default: UnitStatus.VACANT })
  status: UnitStatus;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  bedrooms: number;

  @Column({ nullable: true })
  bathrooms: number;

  @Column('decimal', { nullable: true })
  squareMeters: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  tenantId: number;

  @Column({ type: 'timestamp', nullable: true })
  leaseStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  leaseEndDate: Date;

  @ManyToOne(() => Property, (property) => property.units, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'property_id' })
  property: Property;
}