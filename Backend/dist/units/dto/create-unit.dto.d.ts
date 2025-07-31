import { UnitStatus } from '../../shared/enums/unit-status.enum';
export declare class CreateUnitDto {
    unitNumber: string;
    occupied?: boolean;
    status: UnitStatus;
    price: number;
    propertyId: number;
}
