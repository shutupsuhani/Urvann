import React, { useState, useEffect } from 'react';
import { Users, Package, TrendingUp, DollarSign } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Plant } from '../../types/Plant';
import { plantService } from '../../services/api';

interface DashboardStats {
  totalPlants: number;
  inStockPlants: number;
  outOfStockPlants: number;
  totalValue: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPlants: 0,
    inStockPlants: 0,
    outOfStockPlants: 0,
    totalValue: 0
  });
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await plantService.getPlants();
      const plantsArray = Array.isArray(data) ? data : [];
      setPlants(plantsArray);
      
      // Calculate stats
      const totalPlants = plantsArray.length;
      const inStockPlants = plantsArray.filter(plant => plant.availability).length;
      const outOfStockPlants = totalPlants - inStockPlants;
      const totalValue = plantsArray.reduce((sum, plant) => sum + plant.price, 0);
      
      setStats({
        totalPlants,
        inStockPlants,
        outOfStockPlants,
        totalValue
      });
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Plants',
      value: stats.totalPlants,
      icon: <Package className="h-6 w-6" />,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'In Stock',
      value: stats.inStockPlants,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStockPlants,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      title: 'Total Value',
      value: `$${stats.totalValue.toFixed(2)}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    }
  ];

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="p-8">
          <Loading size="lg" text="Loading dashboard data..." />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <div className="p-8">
          <ErrorMessage message={error} onRetry={fetchData} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} p-6 rounded-lg border border-gray-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Plants */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Plants</h2>
          
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {plants.slice(0, 5).map((plant) => (
                    <tr key={plant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {plant.name}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {plants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No plants available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;