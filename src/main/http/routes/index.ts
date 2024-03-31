import { Router } from 'express';
import { userRouter } from './user-routes';
import { shortsLinksRouter } from './shorts-links-routes';
import { counterShortsLinksRouter } from './counter-shrots-links-routes';

const routes = Router();
routes.use('/users', userRouter);
routes.use('/shorts', shortsLinksRouter);
routes.use('/', counterShortsLinksRouter);

export { routes };
