import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { AuthModule } from '../../auth/auth.module';
import { OwnerController } from './controllers/owner.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),   ],
  providers: [UsersService],
  controllers: [UsersController, OwnerController],
  exports: [UsersService,TypeOrmModule],
})
export class UsersModule {}