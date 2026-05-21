import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const newCart = cart.map(item => {
      if (item._id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item._id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success('Item removed');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const placeOrder = async () => {
    if (cart.length === 0) return;
    
    setIsPlacingOrder(true);
    try {
      const orderItems = cart.map(item => ({
        foodItem: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const { data } = await axios.post('/api/orders', {
        items: orderItems,
        totalAmount: total
      });

      localStorage.removeItem('cart');
      setCart([]);
      toast.success('Order placed successfully!');
      navigate(`/student/orders/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
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
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-blue-600 font-medium">₹{item.price}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button onClick={() => updateQuantity(item._id, -1)} className="p-1.5 hover:bg-gray-200 rounded-l-lg transition-colors">
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} className="p-1.5 hover:bg-gray-200 rounded-r-lg transition-colors">
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="font-bold text-gray-900 text-lg">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span className="font-medium text-gray-900">₹{tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={placeOrder}
              disabled={isPlacingOrder}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {isPlacingOrder ? <Loader2 className="animate-spin w-5 h-5" /> : 'Place Order'} 
              {!isPlacingOrder && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
