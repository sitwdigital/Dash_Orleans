export function saveDashboard(summary, groups) {
  const dashboards = JSON.parse(localStorage.getItem('dashboards') || '{}');
  const id = crypto.randomUUID?.() ?? String(Date.now());
  dashboards[id] = { summary, groups, createdAt: Date.now() };
  localStorage.setItem('dashboards', JSON.stringify(dashboards));
  return id;
}

export function loadDashboard(id) {
  const dashboards = JSON.parse(localStorage.getItem('dashboards') || '{}');
  return dashboards[id] || null;
}

