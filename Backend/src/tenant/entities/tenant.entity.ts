import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  idNumber: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  role: string;

  @Column({ type: 'varchar', length: 6, nullable: true }) 
  otp: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  otpExpiresAt: Date | null;

  @Column({ nullable: true })
  refreshToken: string;
}
