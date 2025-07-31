// src/owners/owner.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { AccountStatus } from 'src/iam/users/enums/account-status.enum';
import * as bcrypt from 'bcrypt';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepo: Repository<Owner>,
  ) {}

  async findByEmail(email: string): Promise<Owner | null> {
    return this.ownerRepo.findOne({ where: { email } });
  }

  async createOwner(dto: CreateOwnerDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const owner = this.ownerRepo.create({
      ...dto,
      password: hashedPassword,
      status: AccountStatus.PENDING,
    });
    return this.ownerRepo.save(owner);
  }

  async updateOwner(id: number, data: Partial<Owner>) {
    await this.ownerRepo.update(id, data);
    return this.ownerRepo.findOneBy({ id });
  }

  async deleteOwner(id: number) {
    return this.ownerRepo.delete(id);
  }

  async verifyOwner(id: number) {
    const owner = await this.findById(id);
    owner.status = AccountStatus.APPROVED;
    owner.verified = true;
    return this.ownerRepo.save(owner);
  }

  async saveOwner(owner: Owner) {
    return this.ownerRepo.save(owner);
  }

  async findPendingOwners() {
    return this.ownerRepo.find({
      where: { status: AccountStatus.PENDING },
    });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const owner = await this.findById(id);
    owner.refreshToken = refreshToken;
    await this.ownerRepo.save(owner);
  }

  async findAll() {
    return this.ownerRepo.find();
  }

  async findById(id: number): Promise<Owner> {
    const owner = await this.ownerRepo.findOne({ where: { id } });
    if (!owner) throw new NotFoundException('Owner not found');
    return owner;
  }
}
