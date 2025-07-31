import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import smsConfig from "./config/sms.config";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./iam/users/users.module";
import { User } from "./iam/users/entities/user.entity";
import { Lease } from "./lease/lease.entity";
import { Payment } from "./payments/payment.entity";
import { Sale } from "./sales/sales.entity";

import { AdminModule } from "./admin/admin.module";
import { AdminDashboardModule } from "./admin/admin-dashboard/admin-dashboard.module";
import { TenantDashboardModule } from "./tenant/tenant-dashboard/tenant-dashboard.module";
import { OwnerDashboardModule } from "./owner/owner-dashboard/owner-dashboard.module";
import { OwnerModule } from "./owner/owner.module";
import { UnitModule } from "./units/units.module";
import { Property } from "./properties/entities/property.entity";
import { Unit } from "./units/entities/unit.entity";
import { Tenant } from "./tenant/entities/tenant.entity";
import { Owner } from "./owner/entities/owner.entity";
import { Admin } from "./admin/entities/admin.entity";
import { PropertyModule } from "./properties/properties.module";
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, jwtConfig, smsConfig],
		}),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const dbConfig = configService.get("database");
				return {
					type: "postgres",
					url: dbConfig.url,
					entities: [
						User,
						Lease,
						Payment,
						Request,
						Sale,
						Property,
						Unit,
						Tenant,
						Owner,
						Admin,
					],
					synchronize: dbConfig.synchronize,
					// ssl: dbConfig.ssl ? { rejectUnauthorized: false } : false,
				};
			},
			inject: [ConfigService],
		}),

		AuthModule,
		AdminModule,
		UsersModule,
		OwnerModule,
		PropertyModule,
		AdminDashboardModule,
		TenantDashboardModule,
		OwnerDashboardModule,
		UnitModule,
	],
})
export class AppModule {}
