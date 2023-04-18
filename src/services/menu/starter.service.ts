import { IStarter } from '../../models/menu/starter.model';
import StarterRepository from '../../repository/menu/starter.repository';

class StarterService {
    getAllStarters() {
        return StarterRepository.getAll();
    }

    getStarterById(id: string) {
        return StarterRepository.getById(id);
    }

    createStarter(starter: IStarter) {
        return StarterRepository.create(starter);
    }
    
    updateStarter(id: string, starter: Partial<IStarter>) {
      const starterUpdated: Partial<IStarter> = {...starter, updatedAt: new Date()}
      return StarterRepository.update(id, starterUpdated);
    }

    removeStarter(id: string) {
        const starter: Partial<IStarter> = {deletedAt: new Date()}
        
        return StarterRepository.remove(id, starter);
    }
}

export default new StarterService();