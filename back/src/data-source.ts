import { DataSource } from 'typeorm';
import { Product } from './entity/Product';
import * as dotenv from 'dotenv';

dotenv.config();

let initialized = false;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '0', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Product],
});

export async function initializeDataSource() {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
  }
}
