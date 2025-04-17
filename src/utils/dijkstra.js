export function dijkstra(edges, startId, goalId) {
    const dist = {};
    const prev = {};
    const visited = new Set();
    const pq = [];
  
    for (const node in edges) {
      dist[node] = Infinity;
      prev[node] = null;
    }
  
    dist[startId] = 0;
    pq.push({ id: startId, cost: 0 });
  
    while (pq.length > 0) {
      pq.sort((a, b) => a.cost - b.cost);
      const { id: currentId } = pq.shift();
  
      if (visited.has(currentId)) continue;
      visited.add(currentId);
  
      if (currentId == goalId) break;
  
      for (const neighbor of edges[currentId] || []) {
        const newCost = dist[currentId] + neighbor.cost;
        if (newCost < dist[neighbor.to]) {
          dist[neighbor.to] = newCost;
          prev[neighbor.to] = currentId;
          pq.push({ id: neighbor.to, cost: newCost });
        }
      }
    }
  
    const path = [];
    let node = goalId;
    while (node) {
      path.unshift(node);
      node = prev[node];
    }
  
    return path;
  }
  