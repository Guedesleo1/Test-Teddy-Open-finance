import { DataSource, DataSourceOptions } from 'typeorm';
import { postgresConnection } from '../connections';

const defineDataSourceOptions = (): DataSourceOptions => {
  const isTest = process.env.NODE_ENV === 'test';
  return (isTest ? true : postgresConnection) as DataSourceOptions;
};
export const dateBaseSource = new DataSource(defineDataSourceOptions());
