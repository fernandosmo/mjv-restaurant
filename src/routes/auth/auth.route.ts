import { Request, Response, Router } from 'express';
import UserService from '../../services/user.services';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  
  try {
      const token = await UserService.authorization(req.body.employerCode, req.body.password);
      res.status(200).send({ token });
  } catch (error: any) {
      res.status(401).send({ message: error.message });
  }
});

export default router;