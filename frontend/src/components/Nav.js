import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav style={{ marginBottom: '1em' }}>
      <Link to="/clients" style={{ marginRight: '1em' }}>Clients</Link>
      <Link to="/colis" style={{ marginRight: '1em' }}>Colis</Link>
      <Link to="/new-colis" style={{ marginRight: '1em' }}>+ Nouveau Colis</Link>
      <Link to="/transporteur/colis">Mes Colis (Transporteur)</Link>
      <Link to="/tracking">Suivi Colis</Link>
    </nav>
  );
}
