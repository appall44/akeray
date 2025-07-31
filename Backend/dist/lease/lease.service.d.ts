import { Lease } from './lease.entity';
export declare class LeaseService {
    getLeaseById(id: string): Promise<Lease | null>;
}
