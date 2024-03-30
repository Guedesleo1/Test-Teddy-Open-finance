import { ExpressRouteAdapter } from '@main/adpters/express-route-adapter';
import { JoiAdapter } from '@main/adpters/joi-adapter';
import { CreateUsersFactory } from '@main/factories/create-users-factory';
import { usersSchema } from '@main/validations/users-schemas';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', JoiAdapter.adapt(usersSchema), ExpressRouteAdapter.adapt(CreateUsersFactory.register()));

export { userRouter };
