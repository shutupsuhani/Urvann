import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <div className="mt-2 h-1 w-20 bg-emerald-600 rounded"></div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;