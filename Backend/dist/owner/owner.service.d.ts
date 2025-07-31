import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
export declare class OwnerService {
    private ownerRepo;
    constructor(ownerRepo: Repository<Owner>);
    findByEmail(email: string): Promise<Owner | null>;
    createOwner(dto: CreateOwnerDto): Promise<Owner>;
    updateOwner(id: number, data: Partial<Owner>): Promise<Owner | null>;
    deleteOwner(id: number): Promise<import("typeorm").DeleteResult>;
    verifyOwner(id: number): Promise<Owner>;
    saveOwner(owner: Owner): Promise<Owner>;
    findPendingOwners(): Promise<Owner[]>;
    updateRefreshToken(id: number, refreshToken: string): Promise<void>;
    findAll(): Promise<Owner[]>;
    findById(id: number): Promise<Owner>;
}
