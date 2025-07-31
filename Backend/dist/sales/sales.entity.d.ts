import { User } from '../iam/users/entities/user.entity';
export declare class Sale {
    id: number;
    amount: number;
    notes: string;
    buyer: User;
    createdAt: Date;
}
