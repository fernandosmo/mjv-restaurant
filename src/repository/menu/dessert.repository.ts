import { Dessert, IDessert } from "../../models/menu/dessert.model";

class DessertRepository {
    getAll() {
        return Dessert.find({deletedAt:{$exists:false}});
    }

    getById(id: string) {
        return Dessert.findOne({ _id: id, deletedAt:{$exists:false} });
    }

    create(dessert: IDessert) {

      return Dessert.create(dessert);
    }

    async update(id: string, dessert: Partial<IDessert>) {
        const dessertToUpdate = await this.getById(id)
        
        if(!dessertToUpdate) {
            throw new Error(`Dessert not found`)
        }
        return Dessert.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: dessert });
    }

    async remove(id: string, dessert: Partial<IDessert>) {
      const dessertToDelete = await this.getById(id)
      
      if(!dessertToDelete) {
          throw new Error(`Dessert not found`)
      }
      return Dessert.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: dessert });
    }
}

export default new DessertRepository();