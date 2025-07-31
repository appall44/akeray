import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminDashboardService {
  getAdminStats() {
    return {
      message: 'Welcome to Admin Dashboard',
      usersCount: 100,
      propertiesManaged: 50,
    };
  }
}
