import { IWine, Wine } from "../../models/menu/wine.model";


class WineRepository {
    getAll() {
        return Wine.find({deletedAt:{$exists:false}});
    }

    getById(id: string) {
        return Wine.findOne({ _id: id, deletedAt:{$exists:false} });
    }

    create(wine: IWine) {

      return Wine.create(wine);
    }

    async update(id: string, wine: Partial<IWine>) {
        const wineToDelete = await this.getById(id)
        
        if(!wineToDelete) {
            throw new Error(`Wine not found`)
        }
        return Wine.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: wine });
    }

    async remove(id: string, wine: Partial<IWine>) {
      const wineToDelete = await this.getById(id)
      
      if(!wineToDelete) {
          throw new Error(`Wine not found`)
      }
      return Wine.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: wine });
    }
}

export default new WineRepository();