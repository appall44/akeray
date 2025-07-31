// src/tenant/tenant.controller.ts
import {
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
  Body,
  UseGuards,
  NotFoundException,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/shared/enums/role.enum';
import { SignupDto } from './dto/create-tenant.dto'; 

@Controller()
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  // Admin protected routes
  @Get('admin/tenant')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllTenants() {
    return this.tenantService.findAll();
  }

  @Get('admin/tenant/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getTenantById(@Param('id', ParseIntPipe) id: number) {
    const tenant = await this.tenantService.findById(id);
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  @Patch('admin/tenant/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateTenant(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: any,
  ) {
    const updated = await this.tenantService.updateTenant(id, updateData);
    return { message: 'Tenant updated successfully', updated };
  }

  @Delete('admin/tenant/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteTenant(@Param('id', ParseIntPipe) id: number) {
    const result = await this.tenantService.deleteTenant(id);
    if (!result.affected) throw new NotFoundException('Tenant not found');
    return { message: 'Tenant deleted successfully' };
  }


 @Post('tenant/signup')
async registerTenant(@Body() dto: SignupDto) {
  await this.tenantService.createTenant(dto);
  return { message: 'OTP sent to your email' };
}

  @Post('tenant/verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    const verified = await this.tenantService.verifyOtp(body.email, body.otp);
    if (!verified) throw new BadRequestException('Invalid or expired OTP');
    return { message: 'Tenant verified successfully' };
  }

@Post('tenant/resend-otp')
async resendOtp(@Body() body?: { email?: string }) {
  if (!body || !body.email) {
    throw new BadRequestException('Email must be required');
  }

  await this.tenantService.resendOtp(body.email);
  return { message: 'OTP resent to your email' };
}

}