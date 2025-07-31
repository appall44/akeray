import { Unit } from 'src/units/entities/unit.entity';
import { Owner } from 'src/owner/entities/owner.entity';
import { Role } from 'src/shared/enums/role.enum';
export declare class Property {
    id: number;
    name: string;
    description: string;
    type: string;
    address: string;
    city: string;
    area: string;
    googleMapLink: string;
    totalUnits: number;
    pricePerUnit: number;
    bedrooms: number;
    bathrooms: number;
    squareMeters: number;
    amenities: string[];
    images: string[];
    featured: boolean;
    status: string;
    payForFeatured: boolean;
    featuredDuration: string;
    role: Role;
    ownerId: number;
    owner: Owner;
    units: Unit[];
}
