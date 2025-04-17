import { locations } from '../data/locations';

export function findNearestNode(pos) {
  let minDist = Infinity;
  let nearestId = null;

  for (const loc of locations) {
    const dx = loc.position[0] - pos[0];
    const dy = loc.position[1] - pos[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < minDist) {
      minDist = dist;
      nearestId = loc.id;
    }
  }

  return nearestId;
}
