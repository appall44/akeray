import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { email } });
  }

  async createAdmin(email: string, password: string): Promise<Admin> {
    const exists = await this.findByEmail(email);
    if (exists) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({ email, password: hashedPassword });
    return this.adminRepository.save(admin);
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    (admin as any).refreshToken = refreshToken; // add refreshToken column to entity as needed
    await this.adminRepository.save(admin);
  }
}
