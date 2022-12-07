import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const DB_USERNAME = 'username';
const DB_PASWORD = encodeURIComponent('Y4YWkcry3byVbxIC');

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASWORD}@cluster0.4mjxxiw.mongodb.net/?retryWrites=true&w=majority`,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/entities/*.ts`],
});

