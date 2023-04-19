import historyOrderRepository from "../repository/history-order.repository";

class historyOrderService {
    getAll() {
        return historyOrderRepository.getAll();
    }
}

export default new historyOrderService();