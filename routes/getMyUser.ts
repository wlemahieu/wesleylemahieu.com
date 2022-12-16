import { RequestI, ResponseI } from '@config/express';

export default async (req: RequestI, res: ResponseI) => {
  res.send(req.sessionID);
};
