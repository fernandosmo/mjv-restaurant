import { IDrink } from '../../models/menu/drink.model';
import DrinkRepository from '../../repository/menu/drink.repository';

class DrinkService {
    getAllDrinks() {
        return DrinkRepository.getAll();
    }

    getDrinkById(id: string) {
        return DrinkRepository.getById(id);
    }

    createDrink(drink: IDrink) {
        return DrinkRepository.create(drink);
    }
    
    updateDrink(id: string, drink: Partial<IDrink>) {
      const drinkUpdated: Partial<IDrink> = {...drink, updatedAt: new Date()}
      return DrinkRepository.update(id, drinkUpdated);
    }

    removeDrink(id: string) {
        const drink: Partial<IDrink> = {deletedAt: new Date()}
        
        return DrinkRepository.remove(id, drink);
    }
}

export default new DrinkService();