import {Controller,Post,Body,Get,Param,Put,Delete,Req,UseGuards,HttpStatus,HttpCode} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { UnitService } from '../units/units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('units')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

@Post()
async create(@Body() dto: CreateUnitDto, @Req() req) {
  const unit = await this.unitService.createUnit(dto); 
  return {
    message: 'Unit Created successfully',
    data: unit,
  };
}



  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.unitService.findOne(id);
  }

   @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUnitDto,
    @Req() req,
  ) {
    const updatedUnit = await this.unitService.update(id, req.user.id, req.user.role, dto);
    return {
      message: 'Unit updated successfully',
      data: updatedUnit,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number, @Req() req) {
    await this.unitService.remove(id, req.user.id, req.user.role);
    return {
      message: 'Unit Deleted successfully',
    };
  }
}
