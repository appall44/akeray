import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
