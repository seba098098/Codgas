import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Package, BarChart3, Users, Settings } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  const isSuperAdmin = user?.role === 'superadmin';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-semibold text-gray-900">GasInventory</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{user?.first_name} {user?.last_name}</span>
                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-5 px-2">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/dashboard"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                >
                  <BarChart3 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Dashboard
                </Link>
              </li>
              
              <li>
                <Link
                  to="/inventory"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                >
                  <Package className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Inventario
                </Link>
              </li>
              
              {isAdmin && (
                <li>
                  <Link
                    to="/transactions"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                  >
                    <Package className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Transacciones
                  </Link>
                </li>
              )}
              
              {isSuperAdmin && (
                <li>
                  <Link
                    to="/users"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                  >
                    <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Usuarios
                  </Link>
                </li>
              )}
              
              {isSuperAdmin && (
                <li>
                  <Link
                    to="/settings"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                  >
                    <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Configuración
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;