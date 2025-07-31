import { LeaseService } from './lease.service';
export declare class LeaseController {
    private readonly leaseService;
    constructor(leaseService: LeaseService);
    getLease(id: string): Promise<import("./lease.entity").Lease>;
}
