import { Request, Response, Router } from 'express';
import { authorizationMiddleware } from '../../middlewares/authorization.middleware';
import dessertService from '../../services/menu/dessert.service';
import drinkService from '../../services/menu/drink.service';
import mainCourseService from '../../services/menu/main-course.service';
import saladService from '../../services/menu/salad.service';
import starterService from '../../services/menu/starter.service';
import wineService from '../../services/menu/wine.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const dessert = await dessertService.getAllDesserts();
    const drink = await drinkService.getAllDrinks();
    const mainCourse = await mainCourseService.getAllMainCourses();
    const salad = await saladService.getAllSalads();
    const starter = await starterService.getAllStarters();
    const wine = await wineService.getAllWines();

    const menu = {
      dessert,
      drink,
      mainCourse,
      salad,
      starter,
      wine,
    }
    res.send(menu);
});

router.get('/:category', async (req: Request, res: Response) => {
  const { category } = req.params;
  if (!category) {
    return res.status(400).send({ message: "invalid param"});
  }
  if(category === 'dessert'){
    const desserts = await dessertService.getAllDesserts();
    return res.status(200).send(desserts);
  }
  else if(category === 'drink'){
    const drinks = await drinkService.getAllDrinks();
    return res.status(200).send(drinks);
  }
  else if(category === 'main-course'){
    const mainCourses = await mainCourseService.getAllMainCourses();
    return res.status(200).send(mainCourses);
  }
  else if(category === 'salad'){
    const salads = await saladService.getAllSalads();
    return res.status(200).send(salads);
  }
  else if(category === 'starter'){
    const starters = await starterService.getAllStarters();
    return res.status(200).send(starters);
  }
  else if(category === 'wine'){
    const wines = await wineService.getAllWines();
    return res.status(200).send(wines);
  }
});

router.get('/:category/:id', async (req: Request, res: Response) => {
  const { category, id } = req.params;
  if (!category || !id) {
    return res.status(400).send({ message: "invalid params"});
  }
  if(category === 'dessert'){
    const dessert = await dessertService.getDessertById(id);
    return res.status(200).send(dessert);
  }
  else if(category === 'drink'){
    const drink = await mainCourseService.getMainCourseById(id);
    return res.status(200).send(drink);
  }
  else if(category === 'main-course'){
    const mainCourse = await mainCourseService.getMainCourseById(id);
    return res.status(200).send(mainCourse);
  }
  else if(category === 'salad'){
    const salad = await saladService.getSaladById(id);
    return res.status(200).send(salad);
  }
  else if(category === 'starter'){
    const starter = await starterService.getStarterById(id);
    return res.status(200).send(starter);
  }
  else if(category === 'wine'){
    const wine = await wineService.getWineById(id);
    return res.status(200).send(wine);
  }
});

router.post('/:category', authorizationMiddleware, async (req: Request, res: Response) => {
  const { category } = req.params;
  if (!category) {
    return res.status(400).send({ message: "invalid param"});
  }
  if(category === 'dessert'){
    await dessertService.createDessert(req.body);
    return res.status(201).send({message: 'Dessert created successfully'});
  }
  else if(category === 'drink'){
    await drinkService.createDrink(req.body);
    return res.status(201).send({message: 'Drink created successfully'});
  }
  else if(category === 'main-course'){
    await mainCourseService.createMainCourse(req.body);
    return res.status(201).send({message: 'Main course created successfully'});
  }
  else if(category === 'salad'){
    await saladService.createSalad(req.body);
    return res.status(201).send({message: 'Salad created successfully'});
  }
  else if(category === 'starter'){
    await starterService.createStarter(req.body);
    return res.status(201).send({message: 'Starter created successfully'});
  }
  else if(category === 'wine'){
    await wineService.createWine(req.body);
    return res.status(201).send({message: 'Wine created successfully'});
  }
});

router.delete('/remove/:category/:id', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
      const { category, id } = req.params;
      if (!category) {
        return res.status(400).send({ message: "invalid param"});
      }
      if(category === 'dessert'){
        await dessertService.removeDessert(id);
        return res.status(204).end();
      }
      else if(category === 'drink'){
        await drinkService.removeDrink(id);
        return res.status(204).end();
      }
      else if(category === 'main-course'){
        await mainCourseService.removeMainCourse(id);
        return res.status(204).end();
      }
      else if(category === 'salad'){
        await saladService.removeSalad(id);
        return res.status(204).end();
      }
      else if(category === 'starter'){
        await starterService.removeStarter(id);
        return res.status(204).end();
      }
      else if(category === 'wine'){
        await wineService.removeWine(id);
        return res.status(204).end();
      }
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:category/:id', authorizationMiddleware, async (req: Request, res: Response) => {
  try {
    const { category, id } = req.params;
    if (!category || !id) {
      return res.status(400).send({ message: "invalid params"});
    }
    if(category === 'dessert'){
      await dessertService.updateDessert(id, req.body);
      return res.status(204).end();
    }
    else if(category === 'drink'){
      await drinkService.updateDrink(id, req.body);
      return res.status(204).end();
    }
    else if(category === 'main-course'){
      await mainCourseService.updateMainCourse(id, req.body);
      return res.status(204).end();
    }
    else if(category === 'salad'){
      await saladService.updateSalad(id, req.body);
      return res.status(204).end();
    }
    else if(category === 'starter'){
      await starterService.updateStarter(id, req.body);
      return res.status(204).end();
    }
    else if(category === 'wine'){
      await wineService.updateWine(id, req.body);
      return res.status(204).end();
    }
  } catch(error: any) {
      res.status(400).send({ message: error.message });
  }
});

export default router;