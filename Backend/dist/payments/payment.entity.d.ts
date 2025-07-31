export declare enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}
export declare class Payment {
    id: number;
    amount: number;
    paidAt: Date;
    status: PaymentStatus;
    createdAt: Date;
}
