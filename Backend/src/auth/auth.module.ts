import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../iam/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { AdminModule } from '../admin/admin.module'; 
import { OwnerModule } from '../owner/owner.module'; 
import { TenantModule } from '../tenant/tenant.module';  

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    forwardRef(() => AdminModule),   
    forwardRef(() => OwnerModule),   
    forwardRef(() => TenantModule), 
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
