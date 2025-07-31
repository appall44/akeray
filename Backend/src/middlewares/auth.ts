// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserPayload } from "../auth/interfaces/user-payload.interface";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Use "unknown" then check if it's the right shape
    if (
      typeof decoded === "object" &&
      "id" in decoded &&
      "email" in decoded &&
      "role" in decoded
    ) {
      req.user = decoded as UserPayload;
      next();
    } else {
      return res.status(401).json({ message: "Invalid token payload" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};
