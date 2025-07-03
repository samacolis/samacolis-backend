import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../components/common/Nav';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import Tracking from '../components/Tracking';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        {/* Routes accessibles sans login */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Routes accessibles uniquement avec token */}
        <Route path="/*" element={<PrivateRoutes />} />

        {/* Route accessible à tous (ex. suivi colis) */}
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </BrowserRouter>
  );
}

