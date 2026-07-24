import React from 'react';
import { Star, Filter } from 'lucide-react';
import { categories } from '../data/products';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  isOpen, 
  onClose 
}) => {
  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
    md:relative md:inset-auto md:transform-none md:shadow-none md:w-full
    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={sidebarClasses}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 md:justify-start">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h2>
            <button 
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange.min}
                  onChange={(e) => onFilterChange('priceRange', {
                    ...filters.priceRange,
                    min: Number(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="₹0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange.max}
                  onChange={(e) => onFilterChange('priceRange', {
                    ...filters.priceRange,
                    max: Number(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="₹100000"
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="minRating"
                    value={rating}
                    checked={filters.minRating === rating}
                    onChange={(e) => onFilterChange('minRating', Number(e.target.value))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 flex items-center text-sm text-gray-700">
                    {rating}
                    <Star className="h-4 w-4 text-yellow-400 ml-1 fill-current" />
                    & up
                  </span>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="minRating"
                  value=""
                  checked={filters.minRating === null}
                  onChange={() => onFilterChange('minRating', null)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">All Ratings</span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => onFilterChange('clear')}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
