import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
export declare class OtpService {
    private otpRepo;
    constructor(otpRepo: Repository<Otp>);
    generateOtp(email: string): Promise<string>;
    verifyOtp(email: string, code: string): Promise<boolean>;
}
