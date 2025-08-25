import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PlantCard from '../components/plant/PlantCard';
import SearchBar from '../components/plant/SearchBar';
import CategoryFilter from '../components/plant/CategoryFilter';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { Plant } from '../types/Plant';
import { plantService } from '../services/api';

const Shop: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // ✅ fetch plants from backend
  const fetchPlants = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await plantService.getPlants({
        name: searchTerm || undefined,
        category: selectedCategory || undefined,
      });

      setPlants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load plants. Please try again.');
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ re-fetch when search or category changes
  useEffect(() => {
    fetchPlants();
  }, [searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Loading size="lg" text="Loading our beautiful plants..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Plant Collection</h1>
          <p className="text-lg text-gray-600">
            Discover our premium selection of healthy, beautiful plants
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by plant name or category..."
              />
            </div>

            <div className="lg:w-64">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-emerald-400 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Active filters display */}
          {(searchTerm || selectedCategory) && (
            <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                      Category: {selectedCategory}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {error ? (
          <ErrorMessage message={error} onRetry={fetchPlants} />
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {plants.length === 0
                  ? 'No plants found matching your criteria'
                  : `Showing ${plants.length} ${plants.length === 1 ? 'plant' : 'plants'}`}
              </p>
            </div>

            {plants.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No plants found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or clearing the filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {plants.map((plant) => (
                  <PlantCard key={plant._id} plant={plant} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
