import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = ({ 
  cart, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  getCartTotal 
}) => {
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="text-center py-8">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Add some products to get started!</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart ({cart.length} items)</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-96">
          {cart.map(item => (
            <div key={item.id} className="flex items-center p-6 border-b">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              
              <div className="flex-1 ml-4">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-gray-500 hover:text-gray-700 border rounded"
                >
                  <Minus className="h-4 w-4" />
                </button>
                
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-gray-500 hover:text-gray-700 border rounded"
                >
                  <Plus className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total: ₹{total.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={onCheckout}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
