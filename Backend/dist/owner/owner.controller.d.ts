import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { AccountStatus } from 'src/iam/users/enums/account-status.enum';
import { CreatePropertyDto } from '../properties/dto/create-property.dto';
import { Request } from 'express';
export declare class OwnerController {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    private readonly service;
    registerOwner(dto: CreateOwnerDto, file: Express.Multer.File): Promise<{
        message: string;
        owner: import("./entities/owner.entity").Owner;
    }>;
    getPendingOwners(): Promise<import("./entities/owner.entity").Owner[]>;
    getAllOwners(): Promise<import("./entities/owner.entity").Owner[]>;
    getOwnerById(id: number): Promise<import("./entities/owner.entity").Owner>;
    updateOwner(id: number, updateData: any): Promise<{
        message: string;
        updated: import("./entities/owner.entity").Owner | null;
    }>;
    verifyOwner(id: number): Promise<{
        message: string;
        ownerId?: undefined;
        status?: undefined;
    } | {
        message: string;
        ownerId: number;
        status: AccountStatus;
    }>;
    createProperty(dto: CreatePropertyDto, req: Request & {
        user: any;
    }): Promise<{
        message: string;
        property: import("../properties/entities/property.entity").Property;
    }>;
    deleteOwner(id: number): Promise<{
        message: string;
    }>;
}
