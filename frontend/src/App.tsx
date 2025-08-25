import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import PlantDetails from './pages/PlantDetails';
import Cart from './pages/Cart';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManagePlants from './pages/admin/ManagePlants';
import AddPlant from './pages/admin/AddPlant';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/plants/:id" element={<PlantDetails />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/plants" element={<ManagePlants />} />
            <Route path="/admin/plants/add" element={<AddPlant />} />
            <Route path="/admin/plants/:id/edit" element={<AddPlant />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;