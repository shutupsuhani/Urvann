import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PLANT_CATEGORIES } from '../../utils/constants';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="appearance-none w-full py-3 px-4 pr-8 bg-white border-2 border-gray-300 rounded-lg focus:border-emerald-400 focus:outline-none transition-all duration-200 text-gray-900"
      >
        <option value="">All Categories</option>
        {PLANT_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default CategoryFilter;