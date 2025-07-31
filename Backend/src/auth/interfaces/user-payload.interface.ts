// src/auth/interfaces/user-payload.interface.ts

import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  id: number;
  email: string;
  role: "owner" | "admin" | "tenant"; // if applicable
}
