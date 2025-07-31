import { Injectable } from '@nestjs/common';

@Injectable()
export class OwnerDashboardService {
  getOwnerStats() {
    return {
      message: 'Welcome to Owner Dashboard',
      propertiesOwned: 4,
      tenants: 10,
    };
  }
}
