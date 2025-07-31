import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Role } from 'src/shared/enums/role.enum';
import { Owner } from 'src/owner/entities/owner.entity';
import { Admin } from 'src/admin/entities/admin.entity';
export declare class OwnerPropertiesService {
    private readonly propertyRepository;
    private readonly ownerRepository;
    private readonly adminRepository;
    constructor(propertyRepository: Repository<Property>, ownerRepository: Repository<Owner>, adminRepository: Repository<Admin>);
    createProperty(userId: number, dto: CreatePropertyDto, userRole: Role): Promise<Property>;
    updateProperty(propertyId: number, userId: number, userRole: Role, dto: UpdatePropertyDto): Promise<Property>;
    deleteProperty(propertyId: number, userId: number, userRole: Role): Promise<void>;
    getAllProperties(): Promise<Property[]>;
    getPropertyById(propertyId: number, userId: number, userRole: Role): Promise<Property>;
}
