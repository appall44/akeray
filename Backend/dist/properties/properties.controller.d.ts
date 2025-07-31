import { Request } from 'express';
import { OwnerPropertiesService } from './properties.service';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class OwnerPropertiesController {
    private readonly service;
    constructor(service: OwnerPropertiesService);
    createProperty(images: Express.Multer.File[], body: any, req: Request & {
        user: any;
    }): Promise<{
        message: string;
        property: import("./entities/property.entity").Property;
    }>;
    findAll(): Promise<import("./entities/property.entity").Property[]>;
    getPropertyById(id: number, req: Request & {
        user: any;
    }): Promise<import("./entities/property.entity").Property>;
    updateProperty(id: number, dto: UpdatePropertyDto, req: Request & {
        user: any;
    }): Promise<{
        message: string;
        property: import("./entities/property.entity").Property;
    }>;
    deleteProperty(id: number, req: Request & {
        user: any;
    }): Promise<{
        message: string;
    }>;
}
