import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Clock, CheckCircle2, ChefHat, Loader2, Package, ArrowRight } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/my');
        setOrders(data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Pending':
        return { icon: <Clock className="w-5 h-5" />, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      case 'Preparing':
        return { icon: <ChefHat className="w-5 h-5" />, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
      case 'Ready':
        return { icon: <Package className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'Completed':
        return { icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      default:
        return { icon: <Clock className="w-5 h-5" />, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <Clock className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">You haven't placed any orders. Browse the menu to get started.</p>
        <Link 
          to="/student/menu" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>

      <div className="space-y-4">
        {orders.map(order => {
          const status = getStatusConfig(order.status);
          const date = new Date(order.createdAt).toLocaleString();
          
          return (
            <Link 
              key={order._id} 
              to={`/student/orders/${order._id}`}
              className="block bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-shadow group"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${status.bg} ${status.color} border ${status.border}`}>
                    {status.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Token: {order.tokenNumber}</h3>
                    <p className="text-sm text-gray-500">{date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color} border ${status.border}`}>
                    {order.status}
                  </span>
                  <div className="font-bold text-gray-900">₹{order.totalAmount}</div>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between items-center text-sm text-gray-600">
                <div className="truncate pr-4">
                  {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
