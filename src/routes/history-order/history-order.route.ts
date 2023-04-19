import { Request, Response, Router } from "express";
import historyOrderService from "../../services/history-order.service";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    res.send(await historyOrderService.getAll());
  } catch(error: any) {
    res.status(400).send({ message: error.message });
  }     
});

export default router;