import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true',
  synchronize: process.env.TYPEORM_SYNC === 'true',
}));

