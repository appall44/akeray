import { Injectable, ConflictException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../enums/user-role.enum';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/auth/dto/create-user.dto';
import { AccountStatus } from '../enums/account-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = this.normalizeEmail(email);
    return this.usersRepository.findOne({ where: { email: normalizedEmail } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  private async hashPassword(password?: string): Promise<string> {
    if (!password) {
      throw new ConflictException('Password is required');
    }
    return bcrypt.hash(password, 10);
  }
// Tenant password already hashed before call
async createTenant(data: Partial<User>): Promise<User> {
  data.email = this.normalizeEmail(data.email!);
  const exists = await this.findByEmail(data.email);
  if (exists) throw new ConflictException('Email already registered');

  // Do not hash again here
  data.role = UserRole.TENANT;
  const user = this.usersRepository.create(data);
  return this.usersRepository.save(user);
}

async createOwner(data: Partial<User>): Promise<User> {
  data.email = this.normalizeEmail(data.email!);

  const exists = await this.findByEmail(data.email);
  if (exists) throw new ConflictException('Email already registered');

  data.role = UserRole.OWNER;

  const user = this.usersRepository.create(data);
  return this.usersRepository.save(user);
}

async createAdmin(data: SignupDto): Promise<User> {
  const exists = await this.findByEmail(data.email);
  if (exists) throw new ConflictException('Email already registered');

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = this.usersRepository.create({
    ...data,
    password: hashedPassword,
    role: UserRole.ADMIN,
    isVerified: true,
    status: AccountStatus.APPROVED,
  });

  return this.usersRepository.save(user);
}



  async updateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.refreshToken = refreshToken;
    await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (updateData.email) {
      updateData.email = this.normalizeEmail(updateData.email);
    }

    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.remove(user);
  }

  async verifyOwner(userId: number): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    if (user.role !== UserRole.OWNER) throw new ConflictException('Only owners can be verified');

    user.isVerified = true;
    user.status = AccountStatus.APPROVED;
    return this.usersRepository.save(user);
  }
}
