import { Router } from 'express';
import { userRouter } from './user-routes';
import { shortsLinksRouter } from './shorts-links-routes';

const routes = Router();
routes.use('/users', userRouter);
routes.use('/shorts', shortsLinksRouter);

export { routes };
