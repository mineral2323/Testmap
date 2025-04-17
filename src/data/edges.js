export const edges = {
    1: [{ to: 5, cost: 150 }],
    2: [{ to: 4, cost: 100 }],
    3: [{ to: 4, cost: 200 }, { to: 6, cost: 150 }],
    4: [{ to: 2, cost: 100 }, { to: 3, cost: 200 }, { to: 5, cost: 100 }, { to: 6, cost: 150 }],
    5: [{ to: 1, cost: 150 }, { to: 4, cost: 100 }, { to: 7, cost: 150 }],
    6: [{ to: 3, cost: 150 }, { to: 4, cost: 150 }, { to: 9, cost: 200 }],
    7: [{ to: 4, cost: 100 }, { to: 5, cost: 150 }, { to: 8, cost: 100 }],
    8: [{ to: 7, cost: 100 }],
    9: [{ to: 6, cost: 200 }]
  };
  