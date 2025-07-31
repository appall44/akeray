import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lease } from './lease.entity';
import { LeaseController } from './lease.controller';
import { LeaseService } from './lease.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lease])],
  controllers: [LeaseController],
  providers: [LeaseService],
})
export class LeaseModule {}
