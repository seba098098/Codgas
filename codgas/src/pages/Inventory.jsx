import React, { useState, useEffect } from 'react';
import { Plus, Search, AlertTriangle, Package } from 'lucide-react';
import { inventoryService } from '../services/inventory';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const params = {};
        if (showLowStock) params.low_stock = true;
        
        const data = await inventoryService.getInventory(params);
        setInventory(data);
      } catch {
        // Error al cargar inventario
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [showLowStock]);



  const filteredInventory = inventory.filter(item =>
    item.tank.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tank.tank_type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventario</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Gestión de inventario de tanques de gas</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>Nuevo Tanque</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Buscar por número de serie o tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between sm:justify-end space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLowStock}
                  onChange={(e) => setShowLowStock(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Solo stock bajo</span>
              </label>
            </div>
          </div>
        </div>

        {/* Desktop table view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disponible
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Mínimo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.tank.serial_number}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {item.tank.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.tank.tank_type.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.tank.tank_type.capacity} L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.quantity_available <= item.minimum_stock
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.quantity_available}
                      {item.quantity_available <= item.minimum_stock && (
                        <AlertTriangle className="ml-1 h-3 w-3" />
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.minimum_stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.tank.current_status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : item.tank.current_status === 'in_use'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.tank.current_status === 'maintenance'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.tank.current_status === 'available'
                        ? 'Disponible'
                        : item.tank.current_status === 'in_use'
                        ? 'En Uso'
                        : item.tank.current_status === 'maintenance'
                        ? 'Mantenimiento'
                        : 'Retirado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.tank.location || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile card view */}
        <div className="sm:hidden">
          {filteredInventory.map((item) => (
            <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Package className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.tank.serial_number}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                      item.tank.current_status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : item.tank.current_status === 'in_use'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.tank.current_status === 'maintenance'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.tank.current_status === 'available'
                        ? 'Disponible'
                        : item.tank.current_status === 'in_use'
                        ? 'En Uso'
                        : item.tank.current_status === 'maintenance'
                        ? 'Mantenimiento'
                        : 'Retirado'}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Tipo:</span>
                      <span className="ml-1 text-gray-900">{item.tank.tank_type.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Capacidad:</span>
                      <span className="ml-1 text-gray-900">{item.tank.tank_type.capacity} L</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Disponible:</span>
                      <span className={`ml-1 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                        item.quantity_available <= item.minimum_stock
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.quantity_available}
                        {item.quantity_available <= item.minimum_stock && (
                          <AlertTriangle className="ml-1 h-3 w-3" />
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Mínimo:</span>
                      <span className="ml-1 text-gray-900">{item.minimum_stock}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs">
                    <span className="text-gray-500">Ubicación:</span>
                    <span className="ml-1 text-gray-900">{item.tank.location || 'N/A'}</span>
                  </div>
                  
                  <div className="mt-1 text-xs text-gray-500">
                    ID: {item.tank.id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredInventory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || showLowStock
              ? 'No se encontraron tanques que coincidan con los filtros'
              : 'No hay tanques registrados'
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;