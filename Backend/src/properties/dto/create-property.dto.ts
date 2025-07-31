import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  area: string;

  @IsOptional()
  @IsString()
  googleMapLink?: string;

  @IsInt()
  totalUnits: number;

  @IsNumber()
  pricePerUnit: number;

  @IsInt()
  bedrooms: number;

  @IsInt()
  bathrooms: number;

  @IsOptional()
  @IsNumber()
  squareMeters?: number;

  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsBoolean()
  featured: boolean;

  @IsString()
  status: string;

  @IsBoolean()
  payForFeatured: boolean;

  @IsString()
  featuredDuration: string;

  
}
