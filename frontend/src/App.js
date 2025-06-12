// frontend/src/App.js

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ClientsList from './components/ClientsList';
import ColisList from './components/ColisList';
import NewColis from './components/NewColis';
import TransporteurColis from './components/TransporteurColis';
import Nav from './components/Nav';
import Tracking from './components/Tracking';

function PrivateRoute({ children }) {
  return localStorage.getItem('access_token') ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />  {/* Barre de navigation */}

      <Routes>
        {/* Page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Liste des clients */}
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <ClientsList />
            </PrivateRoute>
          }
        />

        {/* Liste des colis */}
        <Route
          path="/colis"
          element={
            <PrivateRoute>
              <ColisList />
            </PrivateRoute>
          }
        />

        <Route
          path="/transporteur/colis"
          element={
            <PrivateRoute>
              <TransporteurColis />
            </PrivateRoute>
          }
        />

        {/* Formulaire de création d’un nouveau colis */}
        <Route
          path="/new-colis"
          element={
            <PrivateRoute>
              <NewColis />
            </PrivateRoute>
          }
        />

 <Route path="/tracking" element={<Tracking />} />
 <Route path="*" element={<Navigate to="/login" />} />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

