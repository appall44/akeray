"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = getEnvVar;
function getEnvVar(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}
//# sourceMappingURL=env.js.map