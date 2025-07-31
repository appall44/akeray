import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { UnitStatus } from '../../shared/enums/unit-status.enum'; 

export class CreateUnitDto {
  @IsString()
  unitNumber: string;

  @IsBoolean()
  @IsOptional()
  occupied?: boolean;

  @IsEnum(UnitStatus)
  status: UnitStatus;

  @IsNumber()
  price: number;

  @IsNumber()
  propertyId: number;
}
