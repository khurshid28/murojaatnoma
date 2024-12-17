import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(body: any): Promise<{
        token: string;
        message: string;
    }>;
}
