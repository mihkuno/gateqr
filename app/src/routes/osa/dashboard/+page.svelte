<script lang="ts">
    import AppShell from '$lib/components/AppShell.svelte';
    import NavBar from '$lib/components/NavBar.svelte';

    const navLinks = [
        { label: 'Applications', href: '/osa' },
        { label: 'Departments', href: '/osa/departments' },
    ];

    let { data } = $props();

    const stats = $derived([
        { label: 'Currently In', value: data.stats.currentlyIn, icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>` },
        { label: 'Available Slots', value: data.stats.availableSlots, icon: `<path d="M3 3h18v18H3z M9 9h6v6H9z"/>` },
        { label: 'Visits Today', value: data.stats.visitsToday, icon: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>` },
    ]);

    let logs = $derived(data.logs);
</script>

<svelte:head>
  <title>Dashboard — OSA | GateQR</title>
  <meta name="description" content="OSA vehicle monitoring dashboard for Liceo de Cagayan University." />
</svelte:head>

<AppShell>
  <NavBar title="Dashboard" links={navLinks} />

  <!-- Stat Cards -->
  <div class="stats-grid">
    {#each stats as stat}
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            {@html stat.icon}
          </svg>
        </div>
        <div class="stat-body">
          <p class="stat-label">{stat.label}</p>
          <p class="stat-value">{stat.value}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Log Table -->
  <div class="table-card">
    <div class="table-header">
      <span class="table-title">Entry & Exit Log</span>
      <span class="table-sub">Today</span>
    </div>
    <div class="table-wrap">
      <table class="log-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Plate</th>
            <th>Bound</th>
          </tr>
        </thead>
        <tbody>
          {#each logs as log}
            <tr>
              <td>{log.date}</td>
              <td>{log.time}</td>
              <td class="plate-cell">{log.plate}</td>
              <td>
                <span class="bound-chip" class:chip-in={log.bound === 'In'} class:chip-out={log.bound === 'Out'}>
                  {log.bound}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</AppShell>

<style>
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
  }

  .stat-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    box-shadow: var(--shadow-sm);
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .stat-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--maroon-tint), var(--maroon-muted));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--maroon);
  }

  .stat-label {
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 0;
    line-height: 1.3;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--maroon);
    letter-spacing: -0.03em;
    margin: 0;
    line-height: 1;
  }

  .stat-body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  /* Table */
  .table-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    border-bottom: 1.5px solid var(--border-light);
  }

  .table-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .table-sub {
    font-size: 0.72rem;
    color: var(--text-muted);
    font-weight: 500;
    background: var(--maroon-muted);
    padding: 0.2rem 0.625rem;
    border-radius: 4px;
  }

  .table-wrap {
    overflow-x: auto;
  }

  .log-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8rem;
  }

  .log-table thead tr {
    background: var(--maroon-muted);
  }

  .log-table th {
    padding: 0.625rem 1rem;
    text-align: left;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--maroon);
    border-bottom: 1.5px solid var(--border-light);
  }

  .log-table td {
    padding: 0.625rem 1rem;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-light);
    vertical-align: middle;
  }

  .log-table tbody tr:last-child td { border-bottom: none; }

  .log-table tbody tr:hover {
    background: var(--maroon-muted);
  }

  .plate-cell {
    font-weight: 600;
    font-family: 'Courier New', monospace;
    font-size: 0.78rem;
    color: var(--maroon);
  }

  .bound-chip {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.03em;
  }

  .chip-in {
    background: #f0fdf4;
    color: #15803d;
    border: 1px solid #86efac;
  }

  .chip-out {
    background: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fca5a5;
  }
</style>