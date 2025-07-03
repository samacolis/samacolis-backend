import { Routes, Route, Navigate } from 'react-router-dom';
import ClientsList from '../components/clients/ClientsList';
import ColisList from '../components/colis/ColisList';
import NewColis from '../components/colis/NewColis';
import TransporteurColis from '../components/colis/TransporteurColis';

function PrivateRoute({ children }) {
  return localStorage.getItem('access_token') ? children : <Navigate to="/login" />;
}

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/clients" element={<PrivateRoute><ClientsList /></PrivateRoute>} />
      <Route path="/colis" element={<PrivateRoute><ColisList /></PrivateRoute>} />
      <Route path="/new-colis" element={<PrivateRoute><NewColis /></PrivateRoute>} />
      <Route path="/transporteur/colis" element={<PrivateRoute><TransporteurColis /></PrivateRoute>} />
    </Routes>
  );
}

