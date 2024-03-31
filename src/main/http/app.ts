import 'reflect-metadata';
import express from 'express';
import { setupRoutes } from './config/routes';
import { setupMiddlewares } from './config/middleware';
import { setupDatabase } from './config/database';
import setupSwagger from './config/swagger';

const app = express();

setupSwagger(app);
setupMiddlewares(app);
setupDatabase();
setupRoutes(app);

export default app;
