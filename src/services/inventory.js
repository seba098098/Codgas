import { api } from './api';

export const inventoryService = {
  async getTanks(params = {}) {
    const response = await api.get('/inventory/tanks', { params });
    return response.data;
  },

  async createTank(tankData) {
    const response = await api.post('/inventory/tanks', tankData);
    return response.data;
  },

  async getTank(tankId) {
    const response = await api.get(`/inventory/tanks/${tankId}`);
    return response.data;
  },

  async updateTank(tankId, tankData) {
    const response = await api.put(`/inventory/tanks/${tankId}`, tankData);
    return response.data;
  },

  async getInventory(params = {}) {
    const response = await api.get('/inventory/inventory', { params });
    return response.data;
  },

  async updateInventory(inventoryId, inventoryData) {
    const response = await api.put(`/inventory/inventory/${inventoryId}`, inventoryData);
    return response.data;
  },

  async createTransaction(transactionData) {
    const response = await api.post('/inventory/transactions', transactionData);
    return response.data;
  },

  async getTransactions(params = {}) {
    const response = await api.get('/inventory/transactions', { params });
    return response.data;
  },
};

export const dashboardService = {
  async getStats() {
    const response = await api.get('/dashboard/dashboard/stats');
    return response.data;
  },

  async getLowStockItems() {
    const response = await api.get('/dashboard/dashboard/low-stock');
    return response.data;
  },

  async getTankStatusSummary() {
    const response = await api.get('/dashboard/dashboard/tank-status-summary');
    return response.data;
  },
};