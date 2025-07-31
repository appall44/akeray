import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]) 
  ],
  providers: [OwnerService],
  exports: [OwnerService], 
})
export class OwnerModule {}
