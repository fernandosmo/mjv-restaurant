import { ISalad } from '../../models/menu/salad.model';
import SaladRepository from '../../repository/menu/salad.repository';

class SaladService {
    getAllSalads() {
        return SaladRepository.getAll();
    }

    getSaladById(id: string) {
        return SaladRepository.getById(id);
    }

    createSalad(salad: ISalad) {
        return SaladRepository.create(salad);
    }
    
    updateSalad(id: string, salad: Partial<ISalad>) {
      const saladUpdated: Partial<ISalad> = {...salad, updatedAt: new Date()}
      return SaladRepository.update(id, saladUpdated);
    }

    removeSalad(id: string) {
        const salad: Partial<ISalad> = {deletedAt: new Date()}
        
        return SaladRepository.remove(id, salad);
    }
}

export default new SaladService();