import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { Client } from "pg";

async function ensureDatabaseExists() {
	const dbUrl = process.env.DATABASE_URL;
	if (!dbUrl) throw new Error("DATABASE_URL not set");

	// Parse DB name from URL
	const url = new URL(dbUrl);
	const dbName = url.pathname.replace(/^\//, "");
	url.pathname = "/postgres"; // connect to default db

	const client = new Client({ connectionString: url.toString() });
	await client.connect();

	const res = await client.query(
		`SELECT 1 FROM pg_database WHERE datname = $1`,
		[dbName]
	);
	if (res.rowCount === 0) {
		await client.query(`CREATE DATABASE "${dbName}"`);
		// Optionally, log or handle creation
	}
	await client.end();
}

async function bootstrap() {
	await ensureDatabaseExists();

	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.enableCors({
		origin: "http://localhost:3000",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	});

	app.useStaticAssets(join(__dirname, "..", "uploads"), {
		prefix: "/uploads/",
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: false,
			transform: true,
		})
	);

	await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
