import { MapContainer, ImageOverlay, Marker, Polyline, useMap } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { locations } from '../data/locations';
import { edges } from '../data/edges';
import { findNearestNode } from '../utils/findNearest';
import { dijkstra } from '../utils/dijkstra';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Popup } from 'react-leaflet';

// 現在地アイコンをカスタム
const currentLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function SetPath({ currentPos, goalId }) {
  const map = useMap();
  const startId = findNearestNode(currentPos);
  const path = dijkstra(edges, startId, goalId);

  // 濃い青線 (選ばれた最短ルートだけ)
  const polylinePositions = path.map(id => {
    const loc = locations.find(l => l.id === id);
    return loc ? loc.position : [0, 0];
  });

  return (
    <>
      {/* 通らない道も全部薄水色で描く */}
      {Object.entries(edges).map(([fromId, neighbors]) => 
        neighbors.map(({ to }) => {
          const fromLoc = locations.find(l => l.id === Number(fromId));
          const toLoc = locations.find(l => l.id === to);
          if (!fromLoc || !toLoc) return null;

          return (
            <Polyline
              key={`${fromId}-${to}`}
              positions={[fromLoc.position, toLoc.position]}
              color="#add8e6" // 薄い水色
              weight={5}     // ★線を太めに (2→5)
            />
          );
        })
      )}

      {/* 通る道だけ濃い青で描く */}
      <Polyline positions={polylinePositions} color="blue" weight={8} /> {/* ★さらに太め (5→8) */}
    </>
  );
}

export default function MapPage() {
  const { id } = useParams();
  const goalId = Number(id);

  // 仮の現在地
  const currentPos = [200, 100];

  return (
    <MapContainer
      center={[250, 250]}
      zoom={-1}
      crs={L.CRS.Simple}
      style={{ height: '100vh', width: '100vw' }}
    >
      {/* 透明度を20%ぐらいに設定（opacity: 0.2） */}
      <ImageOverlay
        url="/map.png"
        bounds={[[0, 0], [500, 500]]}
        opacity={0.2} // ★ここ追加！
      />

      {/* 全拠点マーカー */}
      {locations.map(loc => (
        <Marker
          key={loc.id}
          position={loc.position}
        >
          <Popup>
            {loc.id}
          </Popup>
        </Marker>
      ))}


      {/* 現在地マーカー（緑色アイコン） */}
      <Marker
        position={currentPos}
        icon={currentLocationIcon}
      />

      {/* 経路の表示 */}
      <SetPath currentPos={currentPos} goalId={goalId} />
    </MapContainer>
  );
}
