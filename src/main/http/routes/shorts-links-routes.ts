import { ExpressRouteAdapter } from '@main/adpters/express-route-adapter';
import { CreateShortsLinkFactory } from '@main/factories/create-shorts-link-factory';
import { CounterShortsLinkFactory } from '@main/factories/counter-shorts-link-factory';
import { Router } from 'express';
import { ensureAuthenticated } from '../config/ensureAuthenticated';
import { JoiAdapter } from '@main/adpters/joi-adapter';
import { shortsLinksSchemas } from '@main/validations/shorts-links-schemas';

const shortsLinksRouter = Router();

shortsLinksRouter.post('/links', ensureAuthenticated, JoiAdapter.adapt(shortsLinksSchemas), ExpressRouteAdapter.adapt(CreateShortsLinkFactory.register()));

shortsLinksRouter.post('/:code', ExpressRouteAdapter.adapt(CounterShortsLinkFactory.register()));

export { shortsLinksRouter };
