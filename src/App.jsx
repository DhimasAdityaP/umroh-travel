// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Login from './pages/Login';
import Register from './pages/Register'; // Import halaman Register
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Rute Register */}
          
          {/* Rute untuk pengguna biasa */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Rute untuk admin */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute admin={true}>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Tambahkan rute lainnya di sini */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
