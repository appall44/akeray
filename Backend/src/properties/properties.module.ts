import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Unit } from '../units/entities/unit.entity';
import { User } from 'src/iam/users/entities/user.entity';
import { UsersModule } from 'src/iam/users/users.module';
import { OwnerPropertiesController } from './properties.controller';
import { OwnerPropertiesService } from './properties.service';
import { Owner } from 'src/owner/entities/owner.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property,  Unit, Owner , Admin]),
    UsersModule,
  ],
  controllers: [OwnerPropertiesController],
  providers: [OwnerPropertiesService],
})
export class PropertyModule {}
