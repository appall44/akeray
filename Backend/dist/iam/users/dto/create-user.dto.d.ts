import { UserRole } from '../enums/user-role.enum';
import { AccountStatus } from '../enums/account-status.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    role?: UserRole;
    status?: AccountStatus;
    isVerified?: boolean;
}
