"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const pg_1 = require("pg");
async function ensureDatabaseExists() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl)
        throw new Error("DATABASE_URL not set");
    const url = new URL(dbUrl);
    const dbName = url.pathname.replace(/^\//, "");
    url.pathname = "/postgres";
    const client = new pg_1.Client({ connectionString: url.toString() });
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE "${dbName}"`);
    }
    await client.end();
}
async function bootstrap() {
    await ensureDatabaseExists();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "uploads"), {
        prefix: "/uploads/",
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map