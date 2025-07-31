import { Sale } from 'src/sales/sales.entity';
import { UserRole } from '../enums/user-role.enum';
import { AccountStatus } from '../enums/account-status.enum';
export declare class User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    firstname: string;
    lastname: string;
    refreshToken?: string;
    isVerified: boolean;
    status: AccountStatus;
    sales: Sale[];
}
