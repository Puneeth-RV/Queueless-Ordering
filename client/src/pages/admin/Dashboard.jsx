import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Clock, CheckCircle2, IndianRupee, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/admin/stats');
        setStats(data);
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <ShoppingBag className="w-8 h-8 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      bg: 'bg-yellow-50',
    },
    {
      title: 'Completed Orders',
      value: stats?.completedOrders || 0,
      icon: <CheckCircle2 className="w-8 h-8 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats?.totalRevenue || 0}`,
      icon: <IndianRupee className="w-8 h-8 text-purple-600" />,
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">
            <div className={`p-4 rounded-full ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
