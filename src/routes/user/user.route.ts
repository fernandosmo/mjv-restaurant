import { Request, Response, Router } from 'express';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import UserService from '../../services/user.services';

const router = Router();

router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
    const user = await UserService.getAll();
    res.send(user);
});

router.get('/:employerCode', authorizationMiddleware, async (req: Request, res: Response) => {
    const user = await UserService.getByEmployerCode(Number(req.params.employerCode));
    if(!user) return res.status(400).send({ message: "User not found"});
    res.status(200).send(user);
});

router.post('/', async (req: Request, res: Response) => {
    await UserService.create(req.body);
    res.status(201).send({message: 'User created successfully'});
});

router.delete('/remove/:employerCode', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await UserService.remove(Number(req.params.employerCode));
        res.status(204).end();
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
    
});

router.put('/:employerCode', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await UserService.update(Number(req.params.employerCode), req.body);
        return res.status(204).end();
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
    
});

export default router;