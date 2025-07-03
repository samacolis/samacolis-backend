import { Routes, Route } from 'react-router-dom';
import Accueil from '../pages/Accueil';
import Fonctionnement from '../pages/Fonctionnement';
import Tracking from '../components/Tracking';
import Login from '../components/auth/Login';

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/fonctionnement" element={<Fonctionnement />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

