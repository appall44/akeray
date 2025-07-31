import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    updateUser(id: number, updateData: Partial<User>): Promise<{
        message: string;
        user: User;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
    getProfile(user: any): any;
    findOne(id: number): Promise<User>;
    verifyOwner(id: number): Promise<User>;
}
