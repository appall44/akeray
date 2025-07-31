import { Property } from '../../properties/entities/property.entity';
import { UnitStatus } from '../../shared/enums/unit-status.enum';
export declare class Unit {
    id: number;
    unitNumber: string;
    occupied: boolean;
    status: UnitStatus;
    price: number;
    property: Property;
}
