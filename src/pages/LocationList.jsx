import { useNavigate } from 'react-router-dom';
import { locations } from '../data/locations';

export default function LocationList() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>行きたい場所を選んでください</h1>
      <ul>
        {locations.map(loc => (
          <li key={loc.id}>
            <button
              style={{ margin: 10 }}
              onClick={() => navigate(`/map/${loc.id}`)}
            >
              {loc.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
