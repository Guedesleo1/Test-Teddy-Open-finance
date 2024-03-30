import { ExpressRouteAdapter } from '@main/adpters/express-route-adapter';
import { CreateShortsLinkFactory } from '@main/factories/create-shorts-link-factory';
import { Router } from 'express';
import { ensureAuthenticated } from '../config/ensureAuthenticated';
import { JoiAdapter } from '@main/adpters/joi-adapter';
import { shortsLinksSchemas } from '@main/validations/shorts-links-schemas';

const shortsLinksRouter = Router();

shortsLinksRouter.post('/', ensureAuthenticated, JoiAdapter.adapt(shortsLinksSchemas), ExpressRouteAdapter.adapt(CreateShortsLinkFactory.register()));

export { shortsLinksRouter };
