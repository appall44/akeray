import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { Property } from '../properties/entities/property.entity';
import { Owner } from '../owner/entities/owner.entity';
import { Tenant } from '../tenant/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Owner, Tenant])],
  controllers: [ExportController],
  providers: [ExportService],
  exports: [ExportService],
})
export class ExportModule {}