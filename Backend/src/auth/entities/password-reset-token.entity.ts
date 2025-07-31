// src/auth/entities/password-reset-token.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/iam/users/entities/user.entity'; // Or Owner/Tenant if needed

@Entity('password_reset_tokens')
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  userId: number;

  @Column()
  role: string; // 'owner' | 'tenant' | 'admin'

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}
