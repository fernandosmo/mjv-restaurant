import { IStarter, Starter } from "../../models/menu/starter.model";

class StarterRepository {
    getAll() {
        return Starter.find({deletedAt:{$exists:false}});
    }

    getById(id: string) {
        return Starter.findOne({ _id: id, deletedAt:{$exists:false} });
    }

    create(starter: IStarter) {

      return Starter.create(starter);
    }

    async update(id: string, starter: Partial<IStarter>) {
        const starterToUpdate = await this.getById(id)
        
        if(!starterToUpdate) {
            throw new Error(`Starter not found`)
        }
        return Starter.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: starter });
    }

    async remove(id: string, starter: Partial<IStarter>) {
      const starterToDelete = await this.getById(id)
      
      if(!starterToDelete) {
          throw new Error(`Starter not found`)
      }
      return Starter.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: starter });
    }
}

export default new StarterRepository();