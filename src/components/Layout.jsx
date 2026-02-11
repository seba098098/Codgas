import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Package, BarChart3, Users, Settings, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                {sidebarOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
              <Link to="/dashboard" className="flex items-center space-x-2 ml-2 lg:ml-0">
                <Package className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-semibold text-gray-900 hidden sm:block">GasInventory</span>
                <span className="text-xl font-semibold text-gray-900 sm:hidden">GI</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-xs sm:text-sm text-gray-700 hidden sm:block">
                <span className="font-medium">{user?.first_name} {user?.last_name}</span>
                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {user?.role}
                </span>
              </div>
              <div className="text-xs text-gray-700 sm:hidden">
                <span className="font-medium">{user?.first_name?.split(' ')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-1 sm:p-0"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full lg:mt-0">
            <div className="lg:hidden flex items-center justify-between p-4 border-b">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-semibold text-gray-900">GasInventory</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="mt-5 px-2 lg:mt-5">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                  >
                    <BarChart3 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                
                <li>
                  <Link
                    to="/inventory"
                    onClick={() => setSidebarOpen(false)}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                  >
                    <Package className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    <span>Inventario</span>
                  </Link>
                </li>
                
                {isAdmin && (
                  <li>
                    <Link
                      to="/transactions"
                      onClick={() => setSidebarOpen(false)}
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                    >
                      <Package className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      <span>Transacciones</span>
                    </Link>
                  </li>
                )}
                
                {isSuperAdmin && (
                  <li>
                    <Link
                      to="/users"
                      onClick={() => setSidebarOpen(false)}
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                    >
                      <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      <span>Usuarios</span>
                    </Link>
                  </li>
                )}
                
                {isSuperAdmin && (
                  <li>
                    <Link
                      to="/settings"
                      onClick={() => setSidebarOpen(false)}
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
                    >
                      <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      <span>Configuración</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;