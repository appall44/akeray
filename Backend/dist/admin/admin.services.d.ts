import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    findByEmail(email: string): Promise<Admin | null>;
    createAdmin(email: string, password: string): Promise<Admin>;
    updateRefreshToken(id: number, refreshToken: string): Promise<void>;
}
