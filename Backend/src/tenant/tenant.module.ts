import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { MailModule } from '../auth/email/mail.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),MailModule 
  ],
  providers: [TenantService],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
