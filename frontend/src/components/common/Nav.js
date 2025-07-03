import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <nav style={{ marginBottom: '1em' }}>
      <Link to="/" style={{ marginRight: '1em' }}>Accueil</Link>
      <Link to="/clients" style={{ marginRight: '1em' }}>Clients</Link>
      <Link to="/colis" style={{ marginRight: '1em' }}>Colis</Link>
      <Link to="/new-colis" style={{ marginRight: '1em' }}>+ Nouveau Colis</Link>
      <Link to="/transporteur/colis" style={{ marginRight: '1em' }}>Mes Colis (Transporteur)</Link>
      <Link to="/fonctionnement" style={{ marginRight: '1em' }}>Fonctionnement</Link>
      <Link to="/tracking" style={{ marginRight: '1em' }}>Suivi Colis</Link>

      {!isAuthenticated ? (
        <Link to="/login" style={{ marginRight: '1em' }}>Connexion</Link>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: '1em' }}>
          Déconnexion
        </button>
      )}
    </nav>
  );
}

