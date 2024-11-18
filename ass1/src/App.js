import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Detail from './components/Detail';
import AddStaff from './components/AddStaff';
import EditStaff from './components/EditStaff';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<AddStaff />} />
        <Route path="/edit/:id" element={<EditStaff />} />
      </Routes>
    </Router>
  );
}

export default App;
