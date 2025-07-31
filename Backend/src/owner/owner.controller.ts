// src/owners/owner.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/shared/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { AccountStatus } from 'src/iam/users/enums/account-status.enum';
import { CreatePropertyDto } from '../properties/dto/create-property.dto';
import { Request } from 'express';
import { OwnerPropertiesService } from '../properties/properties.service';



@Controller()
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}
private readonly service: OwnerPropertiesService


  async registerOwner(
    @Body() dto: CreateOwnerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!dto.agreementsAccepted) {
      throw new BadRequestException('Agreements must be accepted');
    }

    const ownershipProofUrl = file ? file.filename : undefined;

    const created = await this.ownerService.createOwner({
      ...dto,
      ownershipProofUrl,
      verified: false,
    });

    return {
      message: 'Owner registered successfully',
      owner: created,
    };
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/owners/pending')
  async getPendingOwners() {
    return this.ownerService.findPendingOwners();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/owners')
  async getAllOwners() {
    return this.ownerService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/owners/:id')
  async getOwnerById(@Param('id', ParseIntPipe) id: number) {
    return this.ownerService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('admin/owners/:id')
  async updateOwner(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: any,
  ) {
    const owner = await this.ownerService.findById(id);
    if (!owner) throw new NotFoundException('Owner not found');

    const updated = await this.ownerService.updateOwner(id, updateData);
    return { message: 'Owner updated successfully', updated };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('admin/owners/verify/:id')
  async verifyOwner(@Param('id', ParseIntPipe) id: number) {
    const owner = await this.ownerService.findById(id);

    if (!owner) throw new NotFoundException('Owner not found');
    if (owner.status === AccountStatus.APPROVED) {
      return { message: 'Owner already verified' };
    }

    owner.status = AccountStatus.APPROVED;
    owner.verified = true;

    const updated = await this.ownerService.saveOwner(owner);
    return {
      message: 'Owner verified successfully',
      ownerId: updated.id,
      status: updated.status,
    };
  }

  async createProperty(
  @Body() dto: CreatePropertyDto,
  @Req() req: Request & { user: any }
) {
  const userId = req.user.id;
  const userRole = req.user.role as Role;

  const property = await this.service.createProperty(userId, dto, userRole);

  return { message: 'Property created successfully', property };
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('admin/owners/:id')
  async deleteOwner(@Param('id', ParseIntPipe) id: number) {
    const result = await this.ownerService.deleteOwner(id);
    if (!result.affected) throw new NotFoundException('Owner not found');

    return { message: 'Owner deleted successfully' };
  }
}
