import {
  Controller,
  Post,
  Body,
  Get,
  ForbiddenException,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.services';
import { OwnerService } from '../owner/owner.service';
import { TenantService } from '../tenant/tenant.service';
import { CreateOwnerDto } from '../owner/dto/create-owner.dto';
import { Express, Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserPayload } from './interfaces/user-payload.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly ownerService: OwnerService,
    private readonly tenantService: TenantService,
  ) {}

  // Protected route - requires valid JWT
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request) {
    const user = req.user as UserPayload;

    if (!user || !user.email || !user.role) {
      throw new ForbiddenException('Invalid token or missing user information');
    }

    switch (user.role) {
      case 'admin':
        return await this.adminService.findByEmail(user.email);
      case 'owner':
        return await this.ownerService.findByEmail(user.email);
      case 'tenant':
        return await this.tenantService.findByEmail(user.email);
      default:
        throw new ForbiddenException('Unknown user role');
    }
  }

  // Admin signup
  @Post('admin/signup')
  async signupAdmin(@Body() dto: { email: string; password: string }) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.adminService.findByEmail(email);
    if (existing) throw new ForbiddenException('Email already registered');

    const user = await this.adminService.createAdmin(email, dto.password);
    const tokens = await this.authService.getTokens(user.id, user.email, 'admin');
    await this.adminService.updateRefreshToken(user.id, tokens.refreshToken);

    return { message: 'Admin created successfully', ...tokens, role: 'admin' };
  }

  // Owner signup with file upload interceptor
  @Post('owner/signup')
  @UseInterceptors(
    FileInterceptor('ownershipProof', {
      storage: diskStorage({
        destination: './uploads/ownership-proofs',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
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

  // Tenant signup
  @Post('tenant/signup')
  async signupTenant(@Body() dto: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    idNumber?: string;
    phone?: string;
    occupation?: string;
  }) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.tenantService.findByEmail(email);
    if (existing) throw new ForbiddenException('Email already registered');

    const user = await this.tenantService.createTenant({
      email,
      password: dto.password,
      firstname: dto.firstName || '',
      lastname: dto.lastName || '',
      idNumber: dto.idNumber || '',
      phone: dto.phone || '',
      occupation: dto.occupation || '',
      role: 'tenant',
      verified: false,
    });

    const tokens = await this.authService.getTokens(user.id, user.email, 'tenant');
    await this.tenantService.updateRefreshToken(user.id, tokens.refreshToken);

    return { message: 'Tenant account created successfully, OTP sent to email', ...tokens, role: 'tenant' };
  }

  // Admin login
  @Post('admin/login')
  async loginAdmin(@Body() dto: { email: string; password: string }) {
    const email = dto.email.trim().toLowerCase();
    return this.authService.loginAdmin(email, dto.password);
  }

  // Owner login
 @Post('owner/login')
async loginOwner(@Body() dto: { email: string; password: string }) {
  const email = dto.email.trim().toLowerCase();
  return this.authService.loginOwner(email, dto.password);
}

  // Tenant login
  @Post('tenant/login')
  async loginTenant(@Body() dto: { email: string; password: string }) {
    const email = dto.email.trim().toLowerCase();
    return this.authService.loginTenant(email, dto.password);
  }
}

