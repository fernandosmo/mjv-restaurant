import { ISalad, Salad } from "../../models/menu/salad.model";


class SaladRepository {
    getAll() {
        return Salad.find({deletedAt:{$exists:false}});
    }

    getById(id: string) {
        return Salad.findOne({ _id: id, deletedAt:{$exists:false} });
    }

    create(salad: ISalad) {

      return Salad.create(salad);
    }

    async update(id: string, salad: Partial<ISalad>) {
        const saladToDelete = await this.getById(id)
        
        if(!saladToDelete) {
            throw new Error(`Salad not found`)
        }
        return Salad.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: salad });
    }

    async remove(id: string, salad: Partial<ISalad>) {
      const saladToDelete = await this.getById(id)
      
      if(!saladToDelete) {
          throw new Error(`Salad not found`)
      }
      return Salad.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: salad });
    }
}

export default new SaladRepository();