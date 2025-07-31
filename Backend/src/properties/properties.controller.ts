import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { OwnerPropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { Role } from '../shared/enums/role.enum';

@Controller('properties')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.OWNER)
export class OwnerPropertiesController {
  constructor(private readonly service: OwnerPropertiesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/properties',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `images-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createProperty(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() body: any,
    @Request() req: ExpressRequest & { user: any },
  ) {
    const userId = req.user.id;
    const userRole = req.user.role as Role;

    try {
      const dto: CreatePropertyDto = {
        name: JSON.parse(body.name),
        description: JSON.parse(body.description),
        type: JSON.parse(body.type),
        address: JSON.parse(body.address),
        city: JSON.parse(body.city),
        area: JSON.parse(body.area),
        totalUnits: parseInt(body.totalUnits, 10),
        pricePerUnit: parseFloat(body.pricePerUnit),
        bedrooms: parseInt(body.bedrooms, 10),
        bathrooms: parseInt(body.bathrooms, 10),
        squareMeters: body.squareMeters
          ? parseFloat(body.squareMeters)
          : undefined,
        googleMapLink: body.googleMapLink || undefined,
        featured: body.featured === 'true' || body.featured === true,
        status: JSON.parse(body.status),
        payForFeatured:
          body.payForFeatured === 'true' || body.payForFeatured === true,
        featuredDuration: JSON.parse(body.featuredDuration),
        amenities: Array.isArray(body.amenities)
          ? body.amenities
          : typeof body.amenities === 'string'
          ? [body.amenities]
          : [],
        images: images.map((file) => file.filename),
      };

      console.log('Creating property:', dto);

      const property = await this.service.createProperty(
        userId,
        dto,
        userRole,
      );

      return {
        message: 'Property created successfully',
        property,
      };
    } catch (error) {
      console.error('Error creating property:', error);
      throw new BadRequestException(
        'Failed to create property: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.service.getAllProperties();
  }

  @Get(':id')
  async getPropertyById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: ExpressRequest & { user: any },
  ) {
    const userId = req.user.id;
    const userRole = req.user.role as Role;

    const property = await this.service.getPropertyById(id, userId, userRole);

    if (!property) {
      throw new BadRequestException('Property not found', HttpStatus.NOT_FOUND);
    }

    return property;
  }

  @Patch(':id')
  async updateProperty(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePropertyDto,
    @Request() req: ExpressRequest & { user: any },
  ) {
    const userId = req.user.id;
    const userRole = req.user.role as Role;

    const updatedProperty = await this.service.updateProperty(id, userId, userRole, dto);

    return { message: 'Property updated successfully', property: updatedProperty };
  }

  @Delete(':id')
  async deleteProperty(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: ExpressRequest & { user: any },
  ) {
    const userId = req.user.id;
    const userRole = req.user.role as Role;

    await this.service.deleteProperty(id, userId, userRole);

    return { message: 'Property deleted successfully' };
  }

  @Get('stats/overview')
  async getPropertyStats() {
    return this.service.getPropertyStats();
  }
}