import { ExpressRouteAdapter } from '@main/adpters/express-route-adapter';
import { CreateShortsLinkFactory } from '@main/factories/create-shorts-link-factory';
import { Router } from 'express';

const shortsLinksRouter = Router();

shortsLinksRouter.post('/', ExpressRouteAdapter.adapt(CreateShortsLinkFactory.register()));

export { shortsLinksRouter };
