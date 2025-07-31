import { UnitService } from '../units/units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    create(dto: CreateUnitDto, req: any): Promise<{
        message: string;
        data: import("./entities/unit.entity").Unit;
    }>;
    findAll(): Promise<import("./entities/unit.entity").Unit[]>;
    findOne(id: number): Promise<import("./entities/unit.entity").Unit>;
    update(id: number, dto: UpdateUnitDto, req: any): Promise<{
        message: string;
        data: import("./entities/unit.entity").Unit;
    }>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
}
