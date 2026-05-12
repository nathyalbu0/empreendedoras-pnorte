import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Institucional from './pages/Institucional'
import Parceiros from './pages/Parceiros'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SejaEmpreendedora from './pages/SejaEmpreendedora'
import ParaEmpreendedoras from './pages/ParaEmpreendedoras'
import Galeria from './pages/Galeria'
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import AdminEnquetes from './pages/admin/AdminEnquetes'
import AdminDocumentos from './pages/admin/AdminDocumentos';
import AdminUsuarios from './pages/admin/AdminUsuarios';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-dark-base">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/institucional" element={<Institucional />} />
              <Route path="/parceiros" element={<Parceiros />} />
              <Route path="/login" element={<Login />} />
              <Route path="/seja-empreendedora" element={<SejaEmpreendedora />} />
              <Route path="/para-empreendedoras" element={<ParaEmpreendedoras />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/dashboard/admin/enquetes" element={<AdminEnquetes />} />
              <Route path="/dashboard/admin/documentos" element={<AdminDocumentos />} />
              <Route path="/dashboard/admin/usuarios" element={<AdminUsuarios />} />
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App