import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(@InjectRepository(Otp) private otpRepo: Repository<Otp>) {}

  async generateOtp(email: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = this.otpRepo.create({ email, code });
    await this.otpRepo.save(otp);

    return code;
  }

  async verifyOtp(email: string, code: string): Promise<boolean> {
    const otp = await this.otpRepo.findOne({ where: { email, code } });
    if (!otp) return false;

    const now = new Date();
    const otpTime = new Date(otp.createdAt);
    const diff = (now.getTime() - otpTime.getTime()) / 1000;

    if (diff > 300) return false; // 5 min expiry

    return true;
  }
}
