import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search plants...",
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`relative flex items-center border-2 rounded-lg transition-all duration-200 ${
        isFocused ? 'border-emerald-400 shadow-md' : 'border-gray-300'
      }`}>
        <Search className="h-5 w-5 text-gray-400 ml-3" />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 py-3 px-3 rounded-lg outline-none text-gray-900 placeholder-gray-500"
        />

        {value && (
          <button
            onClick={clearSearch}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors mr-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;