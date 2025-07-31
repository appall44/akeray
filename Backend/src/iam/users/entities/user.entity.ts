import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Lease } from 'src/lease/lease.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Sale } from 'src/sales/sales.entity';
import { UserRole } from '../enums/user-role.enum';
import { AccountStatus } from '../enums/account-status.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENANT,
  })
  role: UserRole;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING,
  })
  status: AccountStatus;

  // @OneToMany(() => Lease, (lease) => lease.user)
  // leases: Lease[];

  @OneToMany(() => Sale, (sale) => sale.buyer)
  sales: Sale[];

 
}
