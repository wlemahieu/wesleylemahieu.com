import express, { Application, Request, Response } from 'express';
import cors from 'cors';

export interface RequestI extends Request {
  sessionID: string;
}
export type ResponseI = Response;

export default (): [Application] => {
  const app = express();

  app.use(cors({ credentials: true, origin: true }));

  return [app];
};
