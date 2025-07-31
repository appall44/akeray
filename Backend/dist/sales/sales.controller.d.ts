import { SalesService } from './sales.service';
import { Sale } from './sales.entity';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    findAll(): Promise<Sale[]>;
    findOne(id: number): Promise<Sale>;
    remove(id: number): Promise<void>;
}
