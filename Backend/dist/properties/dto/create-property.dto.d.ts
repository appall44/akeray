export declare class CreatePropertyDto {
    name: string;
    description: string;
    type: string;
    address: string;
    city: string;
    area: string;
    googleMapLink?: string;
    totalUnits: number;
    pricePerUnit: number;
    bedrooms: number;
    bathrooms: number;
    squareMeters?: number;
    amenities: string[];
    images: string[];
    featured: boolean;
    status: string;
    payForFeatured: boolean;
    featuredDuration: string;
}
