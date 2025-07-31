import { Request, Response, NextFunction } from "express";
import { UserPayload } from "../auth/interfaces/user-payload.interface";
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
