import React from 'react';
import { CheckCircle, Home, RotateCcw } from 'lucide-react';

const PaymentSuccess = ({ onContinueShopping, onBackToProducts }) => {
  return (
    <div className="max-w-md mx-auto mt-16 p-6 text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>
        
        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <p className="text-sm text-gray-600">
            You will receive an email confirmation with your order details and tracking information.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onContinueShopping}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Continue Shopping</span>
          </button>
          
          <button
            onClick={onBackToProducts}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Back to Products</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
