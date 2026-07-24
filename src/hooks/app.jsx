import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductListing from './components/ProductListing';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import { products } from './data/products';
import { useCart } from './hooks/useCart';

const App = () => {
  const [currentView, setCurrentView] = useState('products'); // products, checkout, success
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All Categories',
    priceRange: { min: 0, max: 100000 },
    minRating: null
  });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showCart, setShowCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  } = useCart();

  // Filter products based on search term and filters
  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      let filtered = products;

      // Search filter
      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Category filter
      if (filters.category !== 'All Categories') {
        filtered = filtered.filter(product => product.category === filters.category);
      }

      // Price range filter
      filtered = filtered.filter(product => {
        const price = product.price;
        const minPrice = filters.priceRange.min || 0;
        const maxPrice = filters.priceRange.max || Number.MAX_VALUE;
        return price >= minPrice && price <= maxPrice;
      });

      // Rating filter
      if (filters.minRating !== null) {
        filtered = filtered.filter(product => product.rating >= filters.minRating);
      }

      setFilteredProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({
        category: 'All Categories',
        priceRange: { min: 0, max: 100000 },
        minRating: null
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show a brief success animation or toast here if desired
  };

  const handleCheckout = () => {
    setShowCart(false);
    setCurrentView('checkout');
  };

  const handlePaymentSuccess = () => {
    setCurrentView('success');
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setShowCart(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsFilterOpen(!isFilterOpen);
  };

  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          cartItemsCount={getCartItemsCount()}
          onCartClick={() => setCurrentView('products')}
          searchTerm=""
          onSearchChange={() => {}}
          onMobileMenuToggle={() => {}}
          isMobileMenuOpen={false}
        />
        <Checkout
          cart={cart}
          onBack={() => {
            setCurrentView('products');
            setShowCart(true);
          }}
          onPaymentSuccess={handlePaymentSuccess}
          getCartTotal={getCartTotal}
          clearCart={clearCart}
        />
      </div>
    );
  }

  if (currentView === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          cartItemsCount={getCartItemsCount()}
          onCartClick={() => setShowCart(true)}
          searchTerm=""
          onSearchChange={() => {}}
          onMobileMenuToggle={() => {}}
          isMobileMenuOpen={false}
        />
        <PaymentSuccess
          onContinueShopping={handleBackToProducts}
          onBackToProducts={handleBackToProducts}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={getCartItemsCount()}
        onCartClick={() => setShowCart(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={isFilterOpen}
              onClose={() => {
                setIsFilterOpen(false);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Products {searchTerm && `for "${searchTerm}"`}
              </h2>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
            </div>

            <ProductListing
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          getCartTotal={getCartTotal}
        />
      )}
    </div>
  );
};

export default App;
