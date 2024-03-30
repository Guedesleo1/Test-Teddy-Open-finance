import 'reflect-metadata';
import express from 'express';
import { setupRoutes } from './config/routes';
import { setupMiddlewares } from './config/middleware';
import { setupDatabase } from './config/database';

const app = express();

setupMiddlewares(app);
setupDatabase();
setupRoutes(app);

export default app;
