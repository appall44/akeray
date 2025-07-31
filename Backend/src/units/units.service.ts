import {Injectable, NotFoundException, ForbiddenException,BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { Property } from '../properties/entities/property.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Role } from 'src/shared/enums/role.enum';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

async createUnit(dto: CreateUnitDto): Promise<Unit> {
  const property = await this.propertyRepository.findOneBy({ id: dto.propertyId });
  if (!property) {
    throw new NotFoundException('Property not found');
  }

  const existingUnit = await this.unitRepository.findOne({
    where: {
      unitNumber: dto.unitNumber,
      property: { id: dto.propertyId },
    },
    relations: ['property'],
  });

 if (existingUnit) {
    throw new BadRequestException(`Unit number "${dto.unitNumber}" already exists for this property.`);
  }

  const unit = this.unitRepository.create({
    unitNumber: dto.unitNumber,
    occupied: dto.occupied ?? false,
    status: dto.status,
    price: dto.price,
    property: property,
  });

  return this.unitRepository.save(unit);
}


  async findAll(): Promise<Unit[]> {
    return this.unitRepository.find({ relations: ['property'] });
  }

  async findOne(id: number): Promise<Unit> {
    const unit = await this.unitRepository.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!unit) throw new NotFoundException('Unit not found');
    return unit;
  }

  async update(
    id: number,
    userId: number,
    role: Role,
    dto: UpdateUnitDto,
  ): Promise<Unit> {
    const unit = await this.unitRepository.findOne({
      where: { id },
      relations: ['property', 'property.owner'],
    });

    if (!unit) throw new NotFoundException('Unit not found');

    if (role === Role.OWNER && unit.property.owner?.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this unit');
    }

    Object.assign(unit, dto);
    return this.unitRepository.save(unit);
  }

  async remove(id: number, userId: number, role: Role): Promise<void> {
    const unit = await this.unitRepository.findOne({
      where: { id },
      relations: ['property', 'property.owner'],
    });

    if (!unit) throw new NotFoundException('Unit not found');

    if (role === Role.OWNER && unit.property.owner?.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this unit');
    }

    await this.unitRepository.remove(unit);
  }
}
