import { Entity, Column, PrimaryGeneratedColumn, OneToMany,} from 'typeorm';
import { AccountStatus } from 'src/iam/users/enums/account-status.enum';
import { Property } from 'src/properties/entities/property.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  idNumber: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @Column()
  googleMapLink: string;

  @OneToMany(() => Property, (property) => property.owner)
  properties: Property[];

  @Column()
  agreementsAccepted: boolean;

  @Column({ nullable: true })
  ownershipProofUrl?: string;

  @Column({ default: 'owner' })
  role: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.PENDING })
  status: AccountStatus;

  @Column({ nullable: true })
  refreshToken?: string;
}
