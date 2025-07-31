import { Repository } from 'typeorm';
import { Sale } from './sales.entity';
export declare class SalesService {
    private readonly salesRepository;
    constructor(salesRepository: Repository<Sale>);
    getAllSales(): Promise<Sale[]>;
    getSaleById(id: number): Promise<Sale>;
    deleteSale(id: number): Promise<void>;
}
