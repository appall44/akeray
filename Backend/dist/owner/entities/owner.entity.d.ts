import { AccountStatus } from 'src/iam/users/enums/account-status.enum';
import { Property } from 'src/properties/entities/property.entity';
export declare class Owner {
    id: number;
    firstName: string;
    lastName: string;
    idNumber: string;
    phone: string;
    email: string;
    password: string;
    location: string;
    googleMapLink: string;
    properties: Property[];
    agreementsAccepted: boolean;
    ownershipProofUrl?: string;
    role: string;
    verified: boolean;
    status: AccountStatus;
    refreshToken?: string;
}
