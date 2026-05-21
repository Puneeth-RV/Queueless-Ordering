import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Coffee, LayoutDashboard, Utensils, ClipboardList, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/admin/menu', icon: <Utensils className="w-5 h-5" />, label: 'Manage Menu' },
    { path: '/admin/orders', icon: <ClipboardList className="w-5 h-5" />, label: 'Manage Orders' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-sm">
        <div className="p-6 flex items-center gap-2 border-b">
          <Coffee className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">QueueLess Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b shadow-sm flex items-center justify-between p-4 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">Admin</span>
          </div>
          <button onClick={logout} className="p-2 text-gray-500 hover:text-red-600">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile Nav */}
        <nav className="md:hidden bg-white border-b flex overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap border-b-2 text-sm font-medium ${
                location.pathname === item.path
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
