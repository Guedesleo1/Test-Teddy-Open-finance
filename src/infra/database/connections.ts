import { UsersEntity } from './typeorm/entities/users.entity';

export const postgresConnection = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'teddyOpenFinnace',
  entities: [UsersEntity],
  migrations: [`${__dirname}/typeorm/migrations/*.ts`]
};
