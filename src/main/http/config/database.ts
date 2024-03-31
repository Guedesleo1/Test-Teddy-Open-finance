import { dateBaseSource } from '@infra/database/typeorm/data-source';

export const setupDatabase = async () => {
  try {
    const conn = await dateBaseSource.initialize();
    console.log(`Connected on database: ${conn.driver.database}`);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
