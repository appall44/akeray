import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Role } from '../shared/enums/role.enum';
import { AccountStatus } from '../iam/users/enums/account-status.enum';
import { Owner } from '../owner/entities/owner.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Unit } from '../units/entities/unit.entity';

@Injectable()
export class OwnerPropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async createProperty(userId: number, dto: CreatePropertyDto, userRole: Role): Promise<Property> {
    const user = userRole === Role.OWNER
      ? await this.ownerRepository.findOne({ where: { id: userId } })
      : await this.adminRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`${userRole} not found`);
    }

    if (userRole === Role.OWNER) {
      const owner = user as Owner;
      if (owner.status !== AccountStatus.APPROVED || !owner.verified) {
        throw new ForbiddenException('Your account must be approved and verified by admin before adding properties');
      }
    }

    const propertyData: Partial<Property> = {
      name: dto.name,
      description: dto.description,
      type: dto.type,
      address: dto.address,
      city: dto.city,
      area: dto.area,
      googleMapLink: dto.googleMapLink,
      totalUnits: dto.totalUnits,
      pricePerUnit: dto.pricePerUnit,
      bedrooms: dto.bedrooms,
      bathrooms: dto.bathrooms,
      squareMeters: dto.squareMeters,
      amenities: dto.amenities,
      images: dto.images,
      featured: dto.featured,
      status: dto.status || 'active',
      payForFeatured: dto.payForFeatured,
      featuredDuration: dto.featuredDuration,
      role: userRole,
      units: [],
    };

    if (userRole === Role.OWNER) {
      propertyData.owner = user as Owner;
    }

    const property = this.propertyRepository.create(propertyData);
    const savedProperty = await this.propertyRepository.save(property);

    // Create units for the property
    const units = [];
    for (let i = 1; i <= dto.totalUnits; i++) {
      const unit = this.unitRepository.create({
        unitNumber: `${i}`,
        price: dto.pricePerUnit,
        bedrooms: dto.bedrooms,
        bathrooms: dto.bathrooms,
        squareMeters: dto.squareMeters,
        property: savedProperty,
        status: 'vacant' as any,
      });
      units.push(unit);
    }

    await this.unitRepository.save(units);

    return this.propertyRepository.findOne({
      where: { id: savedProperty.id },
      relations: ['owner', 'units'],
    });
  }

  async updateProperty(
    propertyId: number,
    userId: number,
    userRole: Role,
    dto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['owner'],
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (userRole === Role.OWNER && property.owner?.id !== userId) {
      throw new ForbiddenException('You do not own this property');
    }

    Object.assign(property, dto);

    return this.propertyRepository.save(property);
  }

  async deleteProperty(propertyId: number, userId: number, userRole: Role): Promise<void> {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['owner', 'units'],
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (userRole === Role.OWNER && property.owner?.id !== userId) {
      throw new ForbiddenException('You do not own this property');
    }

    await this.propertyRepository.remove(property);
  }

  async getAllProperties(): Promise<Property[]> {
    return this.propertyRepository.find({
      relations: ['owner', 'units'],
    });
  }

  async getPropertyById(propertyId: number, userId: number, userRole: Role): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: userRole === Role.OWNER
        ? { id: propertyId, owner: { id: userId } }
        : { id: propertyId },
      relations: ['owner', 'units'],
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async getPropertiesByOwner(ownerId: number): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['owner', 'units'],
    });
  }

  async getPropertyStats() {
    const totalProperties = await this.propertyRepository.count();
    const activeProperties = await this.propertyRepository.count({
      where: { status: 'active' },
    });
    const totalUnits = await this.unitRepository.count();
    const occupiedUnits = await this.unitRepository.count({
      where: { occupied: true },
    });

    return {
      totalProperties,
      activeProperties,
      totalUnits,
      occupiedUnits,
      occupancyRate: totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
    };
  }
}