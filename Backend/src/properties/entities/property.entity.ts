import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Unit } from '../../units/entities/unit.entity';
import { Owner } from '../../owner/entities/owner.entity';
import { Role } from '../../shared/enums/role.enum';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  area: string;

  @Column({ nullable: true })
  googleMapLink: string;

  @Column('int')
  totalUnits: number;

  @Column('decimal')
  pricePerUnit: number;

  @Column('int')
  bedrooms: number;

  @Column('int')
  bathrooms: number;

  @Column('decimal', { nullable: true })
  squareMeters: number;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ default: false })
  featured: boolean;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  payForFeatured: boolean;

  @Column({ default: '30' })
  featuredDuration: string;

  @Column({ type: 'enum', enum: Role, default: Role.OWNER })
  role: Role;

  @Column()
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.properties, { eager: false })
  @JoinColumn({ name: 'ownerId' })
  owner: Owner;

  @OneToMany(() => Unit, (unit) => unit.property, { cascade: true })
  units: Unit[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}