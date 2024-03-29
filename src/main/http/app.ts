import 'reflect-metadata';
import express from 'express';
import { setupRoutes } from './config/routes';
import { setupMiddlewares } from './config/middleware';

const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;
