import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Property } from 'src/properties/entities/property.entity';
import { UnitService } from '../units/units.service';
import { UnitController } from './units.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Property])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
