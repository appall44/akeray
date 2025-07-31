export declare class Tenant {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    idNumber: string;
    phone: string;
    occupation: string;
    verified: boolean;
    role: string;
    otp: string | null;
    otpExpiresAt: Date | null;
    refreshToken: string;
}
