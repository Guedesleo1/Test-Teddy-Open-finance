import { JoiAdapter } from '@main/adpters/joi-adapter';
import { usersSchema } from '@main/validations/users-schemas';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', JoiAdapter.adapt(usersSchema));

export { userRouter };
