import { Application } from 'express';
import getMyUser from '@routes/getMyUser';

export default (app: Application) => {
  app.get('/v1/me', getMyUser);
};
