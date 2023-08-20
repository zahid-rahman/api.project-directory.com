import { join } from 'path';
import { ormConfig } from 'src/env';
import { DataSource } from 'typeorm';

export const dbConnectionOptions = new DataSource({
  type: 'postgres',
  host: ormConfig.host,
  port: ormConfig.port,
  username: ormConfig.username,
  password: ormConfig.password,
  database: ormConfig.database,
  synchronize: ormConfig.synchronize,
  dropSchema: false,
  migrationsRun: true,
  logging: ['migration'],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
});
