import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import BuscarGraduado from './components/pages/BuscarGraduado';
import RegistrarGraduado from './components/pages/RegistrarGraduado';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buscargraduado" element={<BuscarGraduado />} />
          <Route path="/registrar" element={<RegistrarGraduado />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App