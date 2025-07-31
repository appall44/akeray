import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: {
        sub: number;
        email: string;
        role: string;
    }): Promise<{
        id: number;
        email: string;
        role: string;
    }>;
}
export {};
