import { Drink, IDrink } from "../../models/menu/drink.model";


class DrinkRepository {
    getAll() {
        return Drink.find({deletedAt:{$exists:false}});
    }

    getById(id: string) {
        return Drink.findOne({ _id: id, deletedAt:{$exists:false} });
    }

    create(drink: IDrink) {

      return Drink.create(drink);
    }

    async update(id: string, drink: Partial<IDrink>) {
        const drinkToDelete = await this.getById(id)
        
        if(!drinkToDelete) {
            throw new Error(`Drink not found`)
        }
        return Drink.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: drink });
    }

    async remove(id: string, drink: Partial<IDrink>) {
      const drinkToDelete = await this.getById(id)
      
      if(!drinkToDelete) {
          throw new Error(`Drink not found`)
      }
      return Drink.updateOne({ _id: id, deletedAt:{$exists:false} }, { $set: drink });
    }
}

export default new DrinkRepository();