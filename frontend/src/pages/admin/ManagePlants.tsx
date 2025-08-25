import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Plant } from '../../types/Plant';
import { plantService } from '../../services/api';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

const ManagePlants: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await plantService.getPlants();
      setPlants(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load plants. Please try again.');
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async (plantId: string, plantName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${plantName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(plantId);
      await plantService.deletePlant(plantId);
      setPlants(plants.filter(plant => plant.id !== plantId));
    } catch (err) {
      setError('Failed to delete plant. Please try again.');
      console.error('Error deleting plant:', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Manage Plants">
        <div className="p-8">
          <Loading size="lg" text="Loading plants..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Plants">
      <div className="p-8 space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">
              {plants.length} {plants.length === 1 ? 'plant' : 'plants'} total
            </p>
          </div>
          
          <Link
            to="/admin/plants/add"
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Plant</span>
          </Link>
        </div>

        {/* Error Display */}
        {error && (
          <ErrorMessage message={error} onRetry={fetchPlants} />
        )}

        {/* Plants Table */}
        {plants.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No plants yet</h3>
            <p className="text-gray-600 mb-6">
              Start building your plant catalog by adding your first plant
            </p>
            <Link
              to="/admin/plants/add"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Plant
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categories
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {plants.map((plant) => (
                    <tr key={plant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <img
                            src={plant.image || PLACEHOLDER_IMAGE}
                            alt={plant.name}
                            className="w-12 h-12 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {plant.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${plant.price.toFixed(2)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {plant.categories.slice(0, 2).map((category, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                          {plant.categories.length > 2 && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                              +{plant.categories.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          plant.availability
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {plant.availability ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/plants/${plant.id}`}
                            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          
                          <Link
                            to={`/admin/plants/${plant.id}/edit`}
                            className="p-2 text-emerald-600 hover:text-emerald-800 transition-colors"
                            title="Edit Plant"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          
                          <button
                            onClick={() => handleDelete(plant.id, plant.name)}
                            disabled={deletingId === plant.id}
                            className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Delete Plant"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManagePlants;