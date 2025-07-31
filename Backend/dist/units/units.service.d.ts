import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { Property } from '../properties/entities/property.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Role } from 'src/shared/enums/role.enum';
export declare class UnitService {
    private unitRepository;
    private propertyRepository;
    constructor(unitRepository: Repository<Unit>, propertyRepository: Repository<Property>);
    createUnit(dto: CreateUnitDto): Promise<Unit>;
    findAll(): Promise<Unit[]>;
    findOne(id: number): Promise<Unit>;
    update(id: number, userId: number, role: Role, dto: UpdateUnitDto): Promise<Unit>;
    remove(id: number, userId: number, role: Role): Promise<void>;
}
