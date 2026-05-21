import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Protected Pages (Student)
import StudentLayout from './components/StudentLayout';
import Menu from './pages/student/Menu';
import Cart from './pages/student/Cart';
import Orders from './pages/student/Orders';
import OrderStatus from './pages/student/OrderStatus';

// Protected Pages (Admin)
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageMenu from './pages/admin/ManageMenu';
import ManageOrders from './pages/admin/ManageOrders';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentLayout /></ProtectedRoute>}>
              <Route path="menu" element={<Menu />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderStatus />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="menu" element={<ManageMenu />} />
              <Route path="orders" element={<ManageOrders />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
