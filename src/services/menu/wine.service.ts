import { IWine } from '../../models/menu/wine.model';
import WineRepository from '../../repository/menu/wine.repository';

class WineService {
    getAllWines() {
        return WineRepository.getAll();
    }

    getWineById(id: string) {
        return WineRepository.getById(id);
    }

    createWine(wine: IWine) {
        return WineRepository.create(wine);
    }
    
    updateWine(id: string, wine: Partial<IWine>) {
      const wineUpdated: Partial<IWine> = {...wine, updatedAt: new Date()}
      return WineRepository.update(id, wineUpdated);
    }

    removeWine(id: string) {
        const wine: Partial<IWine> = {deletedAt: new Date()}
        
        return WineRepository.remove(id, wine);
    }
}

export default new WineService();