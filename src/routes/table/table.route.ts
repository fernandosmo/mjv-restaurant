import { Request, Response, Router } from 'express';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import tableService from '../../services/table.service';

const router = Router();

router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
    const user = await tableService.getAllTables();
    res.send(user);
});

router.get('/free', authorizationMiddleware, async (req: Request, res: Response) => {
  const user = await tableService.getAllFreeTables();
  res.send(user);
});

router.get('/:tableCode', authorizationMiddleware, async (req: Request, res: Response) => {
    const table = await tableService.getTableByCode(Number(req.params.tableCode));
    if(!table) return res.status(400).send({ message: "Table not found"});
    res.status(200).send(table);
});

router.post('/', async (req: Request, res: Response) => {
    await tableService.createTable(req.body);
    res.status(201).send({message: 'Table created successfully'});
});

router.delete('/remove/:tableCode', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await tableService.removeTable(Number(req.params.tableCode));
        res.status(204).end();
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }  
});

router.delete('/remove/:tableCode/order/:itemId', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await tableService.removeItemOrder(Number(req.params.tableCode), req.params.itemId);
        res.status(204).end();
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }  
});

router.put('/:tableCode', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await tableService.updateTable(Number(req.params.tableCode), req.body);
        return res.status(204).end();
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
    
});

router.put('/:tableCode/start-service', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await tableService.startService(Number(req.params.tableCode));
        return res.status(204).end();
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:tableCode/end-service', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await tableService.endService(Number(req.params.tableCode));
        return res.status(204).end();
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:tableCode/order/:itemId',authorizationMiddleware,async (req: Request, res: Response) => {
  try {
    await tableService.addItemsToOrder(Number(req.params.tableCode), req.params.itemId);
    return res.status(204).end();
} catch(error: any) {
    res.status(400).send({ message: error.message });
}
})

export default router;