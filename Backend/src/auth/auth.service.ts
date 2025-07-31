import {
  Injectable,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admin/admin.services';
import { OwnerService } from '../owner/owner.service';
import { TenantService } from '../tenant/tenant.service';
import { CreateOwnerDto } from '../owner/dto/create-owner.dto';
import { Express } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private ownerService: OwnerService,
    private tenantService: TenantService,
  ) {}

  private jwtSecret = process.env.JWT_SECRET || 'secret';
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'refreshSecret';
  private jwtExpiresIn = '15m';
  private jwtRefreshExpiresIn = '7d';

  async getTokens(id: number, email: string, role: string) {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          { sub: id, email, role },
          { secret: this.jwtSecret, expiresIn: this.jwtExpiresIn },
        ),
        this.jwtService.signAsync(
          { sub: id, email, role },
          { secret: this.jwtRefreshSecret, expiresIn: this.jwtRefreshExpiresIn },
        ),
      ]);
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('Token generation failed', error.stack);
      throw new InternalServerErrorException('Could not generate tokens');
    }
  }

  // ------------------- TENANT -------------------
  async signupTenant(dto: {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    idNumber?: string;
    phone?: string;
    occupation?: string;
  }) {
    try {
      const email = dto.email.trim().toLowerCase();

      const existing = await this.tenantService.findByEmail(email);
      if (existing) throw new ForbiddenException('Email already registered');

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.tenantService.createTenant({
        email,
        password: hashedPassword,
        firstname: dto.firstname || '',
        lastname: dto.lastname || '',
        idNumber: dto.idNumber || '',
        phone: dto.phone || '',
        occupation: dto.occupation || '',
        role: 'tenant',
        verified: false,
      });

      const tokens = await this.getTokens(user.id, user.email, 'tenant');
      await this.tenantService.updateRefreshToken(user.id, tokens.refreshToken);

      return { message: 'Tenant created', ...tokens, role: 'tenant' };
    } catch (error) {
      this.logger.error('Tenant signup failed', error.stack);
      if (error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Tenant signup failed');
    }
  }

  async loginTenant(email: string, password: string) {
    try {
      const user = await this.tenantService.findByEmail(email);
      if (!user) {
        this.logger.warn(`Tenant not found for email: ${email}`);
        throw new ForbiddenException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for tenant: ${email}`);
        throw new ForbiddenException('Invalid credentials');
      }

      const tokens = await this.getTokens(user.id, user.email, 'tenant');
      await this.tenantService.updateRefreshToken(user.id, tokens.refreshToken);

      return { message: 'Tenant login successful', ...tokens, role: 'tenant' };
    } catch (error) {
      this.logger.error('Tenant login failed', error.stack);
      if (error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Tenant login failed');
    }
  }

  // ------------------- ADMIN -------------------
  async signupAdmin(email: string, password: string) {
    try {
      // Check if email already exists could be added here
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.adminService.createAdmin(email, hashedPassword);

      const tokens = await this.getTokens(user.id, user.email, 'admin');
      await this.adminService.updateRefreshToken(user.id, tokens.refreshToken);

      return { message: 'Admin created', ...tokens, role: 'admin' };
    } catch (error) {
      this.logger.error('Admin signup failed', error.stack);
      throw new InternalServerErrorException('Admin signup failed');
    }
  }

  async loginAdmin(email: string, password: string) {
    try {
      this.logger.log(`Attempting admin login for email: ${email}`);

      const user = await this.adminService.findByEmail(email);
      if (!user) {
        this.logger.warn(`Admin not found with email: ${email}`);
        throw new ForbiddenException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Password mismatch for admin: ${email}`);
        throw new ForbiddenException('Invalid credentials');
      }

      const tokens = await this.getTokens(user.id, user.email, 'admin');
      await this.adminService.updateRefreshToken(user.id, tokens.refreshToken);

      this.logger.log(`Admin login successful for email: ${email}`);

      return { message: 'Admin login successful', ...tokens, role: 'admin' };
    } catch (error) {
      this.logger.error(`Admin login failed for email: ${email}`, error.stack);
      if (error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Admin login failed');
    }
  }

  // ------------------- OWNER -------------------
  async signupOwner(dto: CreateOwnerDto, ownershipProofFile?: Express.Multer.File) {
    try {
      const email = dto.email.trim().toLowerCase();

      const existing = await this.ownerService.findByEmail(email);
      if (existing) throw new ForbiddenException('Email already registered');

      const ownershipProofUrl = ownershipProofFile
        ? `/uploads/${ownershipProofFile.filename}`
        : '';

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.ownerService.createOwner({
        firstName: dto.firstName,
        lastName: dto.lastName,
        idNumber: dto.idNumber,
        phone: dto.phone,
        email,
        password: hashedPassword,
        location: dto.location,
        googleMapLink: dto.googleMapLink,
        agreementsAccepted: dto.agreementsAccepted,
        ownershipProofUrl,
        role: 'owner',
        verified: false,
      });

      const tokens = await this.getTokens(user.id, user.email, 'owner');
      await this.ownerService.updateRefreshToken(user.id, tokens.refreshToken);

      return { message: 'Owner created', ...tokens, role: 'owner' };
    } catch (error) {
      this.logger.error('Owner signup failed', error.stack);
      if (error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Owner signup failed');
    }
  }

  async loginOwner(email: string, password: string) {
    try {
      const owner = await this.ownerService.findByEmail(email);
      if (!owner) {
        throw new ForbiddenException('Invalid credentials');
      }

      const passwordMatches = await bcrypt.compare(password, owner.password);
      if (!passwordMatches) {
        throw new ForbiddenException('Invalid credentials');
      }

      const tokens = await this.getTokens(owner.id, owner.email, 'owner');
      await this.ownerService.updateRefreshToken(owner.id, tokens.refreshToken);

      return {
        message: 'Login successful',
        ...tokens,
        role: 'owner',
      };
    } catch (error) {
      this.logger.error('Owner login failed', error.stack);
      if (error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException('Owner login failed');
    }
  }
}
