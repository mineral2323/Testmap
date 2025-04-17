import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocationList from './pages/LocationList';
import MapPage from './pages/MapPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/map/:id" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}
