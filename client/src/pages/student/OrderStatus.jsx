import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Clock, ChefHat, Package, CheckCircle2, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';

const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get('/api/orders/my');
      const foundOrder = data.find(o => o._id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast.error('Order not found');
      }
    } catch (error) {
      toast.error('Failed to fetch order status');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      fetchOrder();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [id]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrder();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Order Not Found</h2>
        <Link to="/student/orders" className="text-blue-600 hover:underline mt-4 inline-block">Back to Orders</Link>
      </div>
    );
  }

  const steps = [
    { id: 'Pending', icon: <Clock className="w-6 h-6" />, label: 'Order Placed' },
    { id: 'Preparing', icon: <ChefHat className="w-6 h-6" />, label: 'Preparing Food' },
    { id: 'Ready', icon: <Package className="w-6 h-6" />, label: 'Ready for Pickup' },
    { id: 'Completed', icon: <CheckCircle2 className="w-6 h-6" />, label: 'Completed' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/student/orders" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Orders
        </Link>
        <button 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border text-center">
        <p className="text-gray-500 mb-2">Token Number</p>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-wider mb-8">{order.tokenNumber}</h1>
        
        {order.status !== 'Completed' && (
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium mb-10">
            <Clock className="w-5 h-5" />
            Estimated wait: {order.estimatedWaitTime} mins
          </div>
        )}

        {/* Progress Tracker */}
        <div className="relative max-w-lg mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>

          <div className="relative z-10 flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isCompleted 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                    } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                  >
                    {step.icon}
                  </div>
                  <span className={`mt-3 text-xs md:text-sm font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Order Details</h3>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                  {item.quantity}x
                </span>
                <span className="font-medium text-gray-900">{item.name}</span>
              </div>
              <span className="text-gray-600">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total Paid</span>
          <span className="text-2xl font-black text-blue-600">₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
