import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import EditProduct from './components/EditProduct';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/product/:id/edit" element={<EditProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
