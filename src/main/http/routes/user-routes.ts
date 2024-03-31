import { ExpressRouteAdapter } from '@main/adpters/express-route-adapter';
import { JoiAdapter } from '@main/adpters/joi-adapter';
import { CreateTokenFactory } from '@main/factories/create-token-factory';
import { CreateUsersFactory } from '@main/factories/create-users-factory';
import { tokenSchemas } from '@main/validations/token-schemas';
import { usersSchema } from '@main/validations/users-schemas';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', JoiAdapter.adapt(usersSchema), ExpressRouteAdapter.adapt(CreateUsersFactory.register()));
userRouter.post('/token', JoiAdapter.adapt(tokenSchemas), ExpressRouteAdapter.adapt(CreateTokenFactory.register()));

export { userRouter };
