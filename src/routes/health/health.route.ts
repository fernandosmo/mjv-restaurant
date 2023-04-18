import { Request, Response, Router } from 'express';

const healthRouter = Router();

healthRouter.get('/', (req: Request, res: Response) => {
    const healthCheck = {message: 'Api is working!' }
  res.status(200).send(healthCheck)
})

export default healthRouter;