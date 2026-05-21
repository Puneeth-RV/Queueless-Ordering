import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search, Plus, Loader2 } from 'lucide-react';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  
  const categories = ['All', ...new Set(items.map(item => item.category))];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get('/api/menu');
        setItems(data.filter(item => item.available));
      } catch (error) {
        toast.error('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cItem => cItem._id === item._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${item.name} added to cart`);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Today's Menu</h1>
        
        <div className="flex w-full sm:w-auto gap-4">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              category === c
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border hover:bg-gray-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                <span className="font-bold text-blue-600">₹{item.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{item.description}</p>
              <button
                onClick={() => addToCart(item)}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors mt-auto"
              >
                <Plus className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No items found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
