import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, RefreshCw } from 'lucide-react';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders');
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredOrders = statusFilter === 'All' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const statuses = ['Pending', 'Preparing', 'Ready', 'Completed'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Preparing': return 'bg-orange-100 text-orange-800';
      case 'Ready': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="All">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map(order => (
          <div key={order._id} className="bg-white rounded-xl shadow-sm border p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">Token: {order.tokenNumber}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()} • {order.user?.name || 'Unknown Student'}
                </p>
              </div>
              <div className="text-xl font-bold text-blue-600">
                ₹{order.totalAmount}
              </div>
            </div>

            <div className="border-t border-b py-4 my-4 flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Order Items:</h4>
              <ul className="space-y-2">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span className="text-gray-500">₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Update Status:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => updateStatus(order._id, status)}
                    disabled={order.status === status}
                    className={`px-2 py-2 text-xs font-medium rounded-md border transition-colors ${
                      order.status === status
                        ? getStatusColor(status) + ' border-transparent cursor-default'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed">
            No orders found matching the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
