import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

import { User } from '../iam/users/entities/user.entity';
import { Property } from '../properties/entities/property.entity';
import { Unit } from '../units/entities/unit.entity';
import { Lease } from '../lease/lease.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,  
  ssl: { rejectUnauthorized: false },  
  synchronize: true,
  logging: false,
  entities: [User, Property, Unit, Lease],
  migrations: [],
  subscribers: [],
});
