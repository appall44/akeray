import { BaseEntity } from 'typeorm';
export declare class Lease extends BaseEntity {
    id: number;
    leaseId: string;
    property: string;
    unit: string;
    address: string;
    tenant: string;
    landlord: string;
    startDate: string;
    endDate: string;
    monthlyRent: number;
    deposit: number;
    status: string;
    renewalOption: boolean;
    noticePeriod: number;
    lateFeePenalty: number;
    leaseTerms: string[];
    paymentSchedule: {
        month: string;
        amount: number;
        status: string;
        date: string;
    }[];
}
