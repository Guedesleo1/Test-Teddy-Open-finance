import { ExpressRouteAdapter } from '@main/adpters/express-route-adapter';
import { CreateShortsLinkFactory } from '@main/factories/create-shorts-link-factory';
import { CounterShortsLinkFactory } from '@main/factories/counter-shorts-link-factory';
import { Router } from 'express';
import { ensureAuthenticatedPrivate } from '../config/ensureAuthenticatedPrivate';
import { JoiAdapter } from '@main/adpters/joi-adapter';
import { shortsLinksSchemas } from '@main/validations/shorts-links-schemas';
import { ListShortsLinkFactory } from '@main/factories/list-shorts-links-factory';
import { ensureAuthenticatedPulbic } from '../config/ensureAuthenticatedPulbic';
import { DeleteShortsLinkFactory } from '@main/factories/delete-shorts-links-factory';
import { UpdateShortsLinkFactory } from '@main/factories/update-shorts-links-factory';

const shortsLinksRouter = Router();

shortsLinksRouter.post('/links', ensureAuthenticatedPulbic, JoiAdapter.adapt(shortsLinksSchemas), ExpressRouteAdapter.adapt(CreateShortsLinkFactory.register()));

shortsLinksRouter.post('/:code', ExpressRouteAdapter.adapt(CounterShortsLinkFactory.register()));

shortsLinksRouter.get('/', ensureAuthenticatedPrivate, ExpressRouteAdapter.adapt(ListShortsLinkFactory.register()));

shortsLinksRouter.delete('/:code', ensureAuthenticatedPrivate, ExpressRouteAdapter.adapt(DeleteShortsLinkFactory.register()));

shortsLinksRouter.put('/:code', ensureAuthenticatedPrivate, ExpressRouteAdapter.adapt(UpdateShortsLinkFactory.register()));

export { shortsLinksRouter };
