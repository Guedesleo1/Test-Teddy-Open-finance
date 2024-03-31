import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from '../docs/swaggerConfig';

export default (app: Express): void => {
  app.use('/docs', serve, setup(swaggerConfig));
};
