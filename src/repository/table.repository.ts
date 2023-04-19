import { HistoryOrder } from "../models/history-order.model";
import { SequencyTableCode } from "../models/table-code-seq.model";
import { ITable, Table } from "../models/table.model";
import { getItemPrice } from "../utils/service.util";

class TableRepository {
    getAll() {
        return Table.find({deletedAt:{$exists:false}});
    }
    
    getByCode(code: number) {
        return Table.findOne({ code, deletedAt:{$exists:false} });
    }
    
    getFree() {
      return Table.findOne({ occupied: false, deletedAt:{$exists:false} });
    }

    async create(table: ITable) {
      const tableCodeSeq: any = await SequencyTableCode.findOne()
      
      if (!tableCodeSeq) {
        SequencyTableCode.create({seq:1})

        const tableToCreate = {...table, code: 1}
      
        return Table.create(tableToCreate);
      }
      const tableCode: number = tableCodeSeq!.seq + 1

      await SequencyTableCode.updateOne(({_id: tableCodeSeq!.id}), { seq: tableCode } )

      const tableToCreate = {...table, code: tableCode}

      return Table.create(tableToCreate);
    }

    async update(code: number, table: Partial<ITable>) {
        const tableToUpdate = await this.getByCode(code)
        
        if(!tableToUpdate) {
            throw new Error(`Table not found`)
        }
        return Table.updateOne({ code, deletedAt:{$exists:false} }, { $set: table });
    }

    async endService(code: number, table: Partial<ITable>) {
      const tableToUpdate = await this.getByCode(code)

      if(!tableToUpdate) {
          throw new Error(`Table not found`)
      }
      
      if(!tableToUpdate.occupied) {
        throw new Error(`Couldn't end service not started`)
      }

      await HistoryOrder.create({
        startServiceDate: tableToUpdate.startServiceDate,
        endServiceDate: tableToUpdate.endServiceDate,
        orderItems: tableToUpdate.orderItems,
        bill: tableToUpdate.bill,
        paid: true,
        createdAt: tableToUpdate.createdAt,
      })
      
      return Table.updateOne({ code, deletedAt:{$exists:false} }, { $set: table });
  }

    async updateOrder(codeTable: number, itemId: string) {
      const priceItem = await getItemPrice(itemId)
      const tableToUpdate = await this.getByCode(codeTable)
      const quantity = 1

      if (!priceItem) {
        throw new Error('Item not found');
      }
      
      if (!tableToUpdate) {
        throw new Error('Table not found');
      }
      
      if (!tableToUpdate.startServiceDate) {
        throw new Error('Service not started');
      }

      tableToUpdate.bill = tableToUpdate.bill + priceItem
      tableToUpdate.updatedAt = new Date()
      tableToUpdate.orderItems.push({ itemId, quantity });

      await tableToUpdate.save();
    }

    async remove(code: number, table: Partial<ITable>) {
      const tableToDelete = await this.getByCode(code)
      
      if(!tableToDelete) {
          throw new Error(`Table not found`)
      }
      return Table.updateOne({ code, deletedAt:{$exists:false} }, { $set: table });
    }

    async removeOrderItem(codeTable: number, itemId: string) {
      const priceItem = await getItemPrice(itemId)
      const tableToUpdate = await this.getByCode(codeTable)

      if (!priceItem) {
        throw new Error('Item not found');
      }

      if(!tableToUpdate) {
          throw new Error(`Table not found`)
      }

      const itemToRemove = await tableToUpdate.orderItems.filter((item) => itemId === item.itemId)

      if (!itemToRemove) {
        throw new Error('Item not found');
      }
      itemToRemove[0].deletedAt = new Date();
      tableToUpdate.bill = tableToUpdate.bill - priceItem;

      await tableToUpdate.save();
    }
}

export default new TableRepository();