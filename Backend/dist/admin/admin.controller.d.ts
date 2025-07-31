import { AuthService } from 'src/auth/auth.service';
declare class AdminSignupDto {
    email: string;
    password: string;
}
declare class AdminLoginDto {
    email: string;
    password: string;
}
export declare class AdminController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(dto: AdminSignupDto): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    login(dto: AdminLoginDto): Promise<{
        role: string;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
}
export {};
