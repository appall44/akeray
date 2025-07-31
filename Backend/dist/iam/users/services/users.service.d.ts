import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignupDto } from 'src/auth/dto/create-user.dto';
export declare class UsersService {
    private usersRepository;
    private authService;
    constructor(usersRepository: Repository<User>, authService: AuthService);
    private normalizeEmail;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    private hashPassword;
    createTenant(data: Partial<User>): Promise<User>;
    createOwner(data: Partial<User>): Promise<User>;
    createAdmin(data: SignupDto): Promise<User>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    findAll(): Promise<User[]>;
    update(id: number, updateData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
    verifyOwner(userId: number): Promise<User>;
}
