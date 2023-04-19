import { HistoryOrder } from "../models/history-order.model";

class HistoryOrderRepository {
    getAll() {
        return HistoryOrder.find();
    }
}

export default new HistoryOrderRepository();