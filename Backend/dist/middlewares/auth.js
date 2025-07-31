"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" &&
            "id" in decoded &&
            "email" in decoded &&
            "role" in decoded) {
            req.user = decoded;
            next();
        }
        else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Token verification failed" });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map