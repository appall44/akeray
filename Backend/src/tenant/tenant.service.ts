import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tenant } from './entities/tenant.entity';
import { MailService } from '../auth/email/mail.service';
import { randomInt } from 'crypto';
import { SignupDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private mailService: MailService,
  ) {}

  async findByEmail(email: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { email } });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private getOtpExpiry(): Date {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // Expires in 10 minutes
    return expiry;
  }

  private async sendOtpEmail(email: string, otp: string) {
    console.log(`Sending OTP ${otp} to email ${email}`);
    await this.mailService.sendOtpEmail(email, otp); // You can customize this
  }

  async createTenant(dto: SignupDto): Promise<Tenant> {
    const tenant = this.tenantRepository.create({
      email: dto.email,
      password: await this.hashPassword(dto.password),
      firstname: dto.firstname,
      lastname: dto.lastname,
      idNumber: dto.idNumber,
      phone: dto.phone,
      occupation: dto.occupation,
      otp: this.generateOtp(),
      otpExpiresAt: this.getOtpExpiry(),
      verified: false,
      role: 'TENANT',
    });

    await this.tenantRepository.save(tenant);

    if (!tenant.email || !tenant.otp) {
      throw new Error('Email or OTP is missing');
    }

    await this.sendOtpEmail(tenant.email, tenant.otp);

    return tenant;
  }

  async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
    const tenant = await this.findByEmail(email);
    if (!tenant) throw new NotFoundException('Tenant not found');

    if (!tenant.otp || !tenant.otpExpiresAt) {
      throw new BadRequestException('No OTP found. Please request again.');
    }

    const now = new Date();
    if (tenant.otp !== otp) throw new BadRequestException('Invalid OTP');
    if (tenant.otpExpiresAt < now) throw new BadRequestException('OTP expired');

    tenant.verified = true;
    tenant.otp = null;
    tenant.otpExpiresAt = null;

    await this.tenantRepository.save(tenant);

    return { message: 'OTP verified. You can now log in.' };
  }

  async resendOtp(email: string): Promise<{ message: string }> {
    const tenant = await this.findByEmail(email);
    if (!tenant) throw new NotFoundException('Tenant not found');
    if (tenant.verified) throw new BadRequestException('Already verified');

    const otp = this.generateOtp();
    const otpExpiresAt = this.getOtpExpiry();

    tenant.otp = otp;
    tenant.otpExpiresAt = otpExpiresAt;
    await this.tenantRepository.save(tenant);

    await this.sendOtpEmail(email, otp);

    return { message: 'OTP resent to email.' };
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findById(id: number): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async updateTenant(id: number, updateData: Partial<Tenant>): Promise<Tenant> {
    const tenant = await this.findById(id);
    Object.assign(tenant, updateData);
    return this.tenantRepository.save(tenant);
  }

  async deleteTenant(id: number) {
    const result = await this.tenantRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Tenant not found');
    return result;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const tenant = await this.findById(id);
    tenant.refreshToken = refreshToken;
    await this.tenantRepository.save(tenant);
  }
}
