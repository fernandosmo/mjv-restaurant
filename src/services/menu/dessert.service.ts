import { IDessert } from '../../models/menu/dessert.model';
import DessertRepository from '../../repository/menu/dessert.repository';

class DessertService {
    getAllDesserts() {
        return DessertRepository.getAll();
    }

    getDessertById(id: string) {
        return DessertRepository.getById(id);
    }

    createDessert(dessert: IDessert) {
        return DessertRepository.create(dessert);
    }
    
    updateDessert(id: string, dessert: Partial<IDessert>) {
      const dessertUpdated: Partial<IDessert> = {...dessert, updatedAt: new Date()}
      return DessertRepository.update(id, dessertUpdated);
    }

    removeDessert(id: string) {
        const dessert: Partial<IDessert> = {deletedAt: new Date()}
        
        return DessertRepository.remove(id, dessert);
    }
}

export default new DessertService();