import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface ListingFiltersProps {
  listingType: 'sublease' | '3PL';
  onSortChange: (sort: {
    field: 'price' | 'size';
    direction: 'asc' | 'desc';
  }) => void;
}

export function ListingFilters({ listingType, onSortChange }: ListingFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState<{
    field: 'price' | 'size';
    direction: 'asc' | 'desc';
  }>({
    field: 'price',
    direction: 'asc',
  });

  const handleSortChange = (field: 'price' | 'size', direction: 'asc' | 'desc') => {
    const newSort = { field, direction };
    setSort(newSort);
    onSortChange(newSort);
    setIsOpen(false);
  };

  const getSortLabel = () => {
    if (sort.field === 'price') {
      return sort.direction === 'asc' ? 'Price: Low to High' : 'Price: High to Low';
    } else {
      return sort.direction === 'asc' ? 'Size: Small to Large' : 'Size: Large to Small';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {getSortLabel()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Sort {listingType === 'sublease' ? 'Sublease' : '3PL'} Listings
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Sort by Price
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSortChange('price', 'asc')}
                    className={`w-full px-3 py-2 text-left text-sm rounded-md ${
                      sort.field === 'price' && sort.direction === 'asc'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Low to High
                  </button>
                  <button
                    onClick={() => handleSortChange('price', 'desc')}
                    className={`w-full px-3 py-2 text-left text-sm rounded-md ${
                      sort.field === 'price' && sort.direction === 'desc'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    High to Low
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Sort by Size
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSortChange('size', 'asc')}
                    className={`w-full px-3 py-2 text-left text-sm rounded-md ${
                      sort.field === 'size' && sort.direction === 'asc'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Small to Large
                  </button>
                  <button
                    onClick={() => handleSortChange('size', 'desc')}
                    className={`w-full px-3 py-2 text-left text-sm rounded-md ${
                      sort.field === 'size' && sort.direction === 'desc'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Large to Small
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 