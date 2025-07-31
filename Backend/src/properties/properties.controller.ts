import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
  Req,
  HttpStatus,
  HttpException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

import { OwnerPropertiesService } from './properties.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('owner/properties')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OWNER, Role.ADMIN)
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
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async createProperty(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() body: any,
    @Req() req: Request & { user: any },
  ) {
    const userId = req.user.id;
    const userRole = req.user.role as Role;

    try {
      const dto: CreatePropertyDto = {
        name: String(body.name),
        description: String(body.description),
        type: String(body.type),
        address: String(body.address),
        city: String(body.city),
        area: String(body.area),
        totalUnits: parseInt(body.totalUnits, 10),
        pricePerUnit: parseFloat(body.pricePerUnit),
        bedrooms: parseInt(body.bedrooms, 10),
        bathrooms: parseInt(body.bathrooms, 10),
        squareMeters: body.squareMeters
          ? parseFloat(body.squareMeters)
          : undefined,
        googleMapLink: body.googleMapLink || undefined,
        featured: body.featured === 'true' || body.featured === true,
        status: String(body.status),
        payForFeatured:
          body.payForFeatured === 'true' || body.payForFeatured === true,
        featuredDuration: String(body.featuredDuration),
        amenities: Array.isArray(body.amenities)
          ? body.amenities
          : typeof body.amenities === 'string'
          ? [body.amenities]
          : [],
        images: images.map((file) => file.filename),
      };

      // Optional: Debug log
      console.log('Parsed DTO:', dto);

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
      console.error('Property creation error:', error);
      throw new HttpException(
        'Invalid data format: ' + error.message,
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
    @Param('id') id: number,
    @Req() req: Request & { user: any },
  ) {
    const userId = req.user.id;
    const userRole = req.user.role as Role;

    const property = await this.service.getPropertyById(id, userId, userRole);

    if (!property) {
      throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
    }

    return property;
  }

  @Put(':id')
  async updateProperty(
    @Param('id') id: number,
    @Body() dto: UpdatePropertyDto,
    @Req() req: Request & { user: any },
  ) {
    const userId = req.user.id;
    const userRole = req.user.role as Role;

    const updatedProperty = await this.service.updateProperty(id, userId, userRole, dto);

    return { message: 'Property updated successfully', property: updatedProperty };
  }

  @Delete(':id')
  async deleteProperty(
    @Param('id') id: number,
    @Req() req: Request & { user: any },
  ) {
    const userId = req.user.id;
    const userRole = req.user.role as Role;

    await this.service.deleteProperty(id, userId, userRole);

    return { message: 'Property deleted successfully' };
  }
}