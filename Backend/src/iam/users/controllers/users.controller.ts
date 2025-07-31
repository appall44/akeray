import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users (no guard here - add if needed)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Update a user partially by ID
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<User>,
  ) {
    const updatedUser = await this.usersService.update(id, updateData);
    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  // Delete a user by ID
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return {
      message: 'User deleted successfully',
    };
  }

  // Get current logged-in user profile, requires JWT auth
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  // Get user by ID, throws 404 if not found
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Admin-only route to verify an owner by ID
  @Patch('verify-owner/:id')
  @Roles(UserRole.ADMIN)
  async verifyOwner(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.verifyOwner(id);
  }
}
