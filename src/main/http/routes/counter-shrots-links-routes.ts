import { ExpressRouteAdapter } from '@main/adpters/express-route-adapter';
import { CounterShortsLinkFactory } from '@main/factories/counter-shorts-link-factory';
import { Router } from 'express';

const counterShortsLinksRouter = Router();

counterShortsLinksRouter.get('/:code', ExpressRouteAdapter.adapt(CounterShortsLinkFactory.register()));

export { counterShortsLinksRouter };
