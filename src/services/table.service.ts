import { ITable } from '../models/table.model';
import TableRepository from '../repository/table.repository';

class TableService {
    getAllTables() {
        return TableRepository.getAll();
    }
    
    getAllFreeTables() {
      return TableRepository.getFree();
  }

    getTableByCode(code: number) {
        return TableRepository.getByCode(code);
    }

    createTable(table: ITable) {
        return TableRepository.create(table);
    }
    
    async updateTable(code: number, table: Partial<ITable>) {
      const tableUpdated: Partial<ITable> = {...table, updatedAt: new Date()}
      return TableRepository.update(code, tableUpdated);
    }

    async addItemsToOrder(codeTable: number, itemId: string) {      
      await TableRepository.updateOrder(codeTable, itemId)
    }

    async startService(code: number) {
      const table: Partial<ITable> = {
        occupied: true,
        startServiceDate: new Date(),
        paid: false,
        updatedAt: new Date()
      }
      return TableRepository.update(code, table);
    }

    async endService(code: number) {
      const table: Partial<ITable> = {
        occupied: false,
        startServiceDate: undefined,
        orderItems: undefined,
        endServiceDate: new Date(),
        paid: true,
        bill: 0,
        updatedAt: new Date()
      }
      return TableRepository.endService(code, table);
    }

    removeTable(code: number) {
        const table: Partial<ITable> = {deletedAt: new Date()}
        
        return TableRepository.remove(code, table);
    }
    
    removeItemOrder(codeTable: number, itemId: string) {      
      return TableRepository.removeOrderItem(codeTable, itemId);
  }
}

export default new TableService();