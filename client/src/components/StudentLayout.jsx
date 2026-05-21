import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Coffee, Menu, ShoppingCart, Clock, LogOut } from 'lucide-react';

const StudentLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { path: '/student/menu', icon: <Menu className="w-5 h-5" />, label: 'Menu' },
    { path: '/student/cart', icon: <ShoppingCart className="w-5 h-5" />, label: 'Cart' },
    { path: '/student/orders', icon: <Clock className="w-5 h-5" />, label: 'Orders' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center gap-2">
                <Coffee className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">QueueLess</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      location.pathname === item.path
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="hidden sm:block text-sm font-medium text-gray-500 mr-4">
                Hi, {user?.name?.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className="sm:hidden border-t">
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-md ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
