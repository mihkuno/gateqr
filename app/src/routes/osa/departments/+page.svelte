<script lang="ts">
    import AppShell from '$lib/components/AppShell.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
    import { invalidateAll } from '$app/navigation';

    let { data } = $props();
    let departments = $derived(data.departments);

    let showForm = $state(false);
    let newDeptName = $state('');
    let newDeptEmail = $state('');
    let loading = $state(false);
    let editingDeptId: number | null = $state(null);

    const navLinks = [
        { label: 'Dashboard', href: '/osa/dashboard' },
        { label: 'Applications', href: '/osa' },
    ];

    async function handleSave() {
        if (!newDeptName || !newDeptEmail) return;
        loading = true;
        try {
            const method = editingDeptId ? 'PUT' : 'POST';
            const body = editingDeptId 
                ? { auto_id: editingDeptId, name: newDeptName, email: newDeptEmail }
                : { name: newDeptName, email: newDeptEmail };

            const res = await fetch('/api/departments', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                showForm = false;
                newDeptName = '';
                newDeptEmail = '';
                editingDeptId = null;
                await invalidateAll();
            } else {
                alert('Failed to save department');
            }
        } catch(e) {
            alert('Network error');
        } finally {
            loading = false;
        }
    }

    async function handleDelete(auto_id: number) {
        if (!confirm('Are you sure you want to delete this department?')) return;
        try {
            const res = await fetch('/api/departments', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ auto_id })
            });
            if (res.ok) {
                await invalidateAll();
            } else {
                alert('Failed to delete department');
            }
        } catch(e) {
            alert('Network error');
        }
    }
</script>

<svelte:head>
  <title>Departments — OSA | GateQR</title>
  <meta name="description" content="Manage college departments and their dean access for GateQR." />
</svelte:head>

<AppShell>
  <NavBar title="Departments" links={navLinks} />

  <div class="dept-toolbar">
    <p class="dept-note">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      Deleting a department with signed applications immediately terminates their access.
    </p>
    <button class="add-btn" onclick={() => { showForm = !showForm; if (!showForm) { editingDeptId = null; newDeptName = ''; newDeptEmail = ''; } }}>
      {#if showForm}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Cancel
      {:else}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        New Department
      {/if}
    </button>
  </div>

  <!-- New department form -->
  {#if showForm}
    <div class="new-dept-card">
      <p class="card-section-title">Add Department</p>
      <div class="form-row">
        <div class="field-group">
          <label class="field-label" for="dept-name">Department name</label>
          <input id="dept-name" type="text" placeholder="College of Science & Technology" bind:value={newDeptName} disabled={loading} />
        </div>
        <div class="field-group">
          <label class="field-label" for="dean-email">Dean email</label>
          <input id="dean-email" type="email" placeholder="dean@liceo.edu.ph" bind:value={newDeptEmail} disabled={loading} />
        </div>
      </div>
      <div class="form-actions">
        <button class="action-btn btn-cancel" onclick={() => { showForm = false; editingDeptId = null; newDeptName = ''; newDeptEmail = ''; }} disabled={loading}>Cancel</button>
        <button class="action-btn btn-save" onclick={handleSave} disabled={loading}>{loading ? 'Saving...' : (editingDeptId ? 'Update Department' : 'Save Department')}</button>
      </div>
    </div>
  {/if}

  <!-- Department list -->
  <div class="dept-list">
    {#each departments as dept}
      <div class="dept-card">
        <div class="dept-card-header">
          <div class="dept-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div class="dept-info">
            <p class="dept-name">{dept.name}</p>
            <p class="dept-dean">{dept.email}</p>
          </div>
          <span class="dept-date">Est. {new Date(dept.created_at).toLocaleDateString()}</span>
        </div>
        <div class="dept-card-body">
          <div class="dept-field">
            <span class="dept-field-label">Email</span>
            <span class="dept-field-val">{dept.email}</span>
          </div>
        </div>
        <div class="dept-actions">
          <button class="dept-btn btn-edit" onclick={() => { newDeptName = dept.name; newDeptEmail = dept.email; editingDeptId = dept.auto_id; showForm = true; }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </button>
          <button class="dept-btn btn-delete" onclick={() => handleDelete(dept.auto_id)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            Delete
          </button>
        </div>
      </div>
    {/each}
  </div>
</AppShell>

<style>
  .dept-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .dept-note {
    display: flex;
    align-items: flex-start;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
    flex: 1;
  }

  .dept-note svg { color: var(--gold); flex-shrink: 0; margin-top: 1px; }

  .add-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: inherit;
    background: var(--maroon);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background 0.15s, transform 0.15s;
    white-space: nowrap;
  }

  .add-btn:hover { background: var(--maroon-light); transform: translateY(-1px); }

  /* New dept form */
  .new-dept-card {
    background: var(--surface);
    border: 1.5px solid var(--maroon-light);
    border-radius: var(--radius-md);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 0 0 4px rgba(107,26,42,0.06);
    animation: slideDown 0.2s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .card-section-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--maroon);
    margin: 0;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    .form-row { grid-template-columns: 1fr; }
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .field-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .form-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .action-btn {
    padding: 0.5rem 1.25rem;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s;
  }

  .action-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  .btn-cancel {
    background: var(--surface);
    color: var(--text-secondary);
    border: 1.5px solid var(--border);
  }

  .btn-save {
    background: var(--maroon);
    color: #fff;
    box-shadow: 0 2px 8px rgba(107,26,42,0.25);
  }

  /* Department list */
  .dept-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .dept-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.15s;
  }

  .dept-card:hover { box-shadow: var(--shadow-md); }

  .dept-card-header {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-light);
  }

  .dept-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--maroon-tint), var(--maroon-muted));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--maroon);
    flex-shrink: 0;
  }

  .dept-info {
    flex: 1;
    min-width: 0;
  }

  .dept-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dept-dean {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 500;
  }

  .dept-date {
    font-size: 0.68rem;
    color: var(--text-muted);
    white-space: nowrap;
    font-weight: 500;
    background: var(--maroon-muted);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    align-self: flex-start;
  }

  .dept-card-body {
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid var(--border-light);
  }

  .dept-field {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .dept-field-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .dept-field-val {
    font-size: 0.8rem;
    color: var(--maroon);
    font-weight: 500;
  }

  .dept-actions {
    display: flex;
    gap: 0;
  }

  .dept-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.625rem;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: transparent;
    transition: background 0.15s, color 0.15s;
  }

  .btn-edit {
    color: var(--text-secondary);
    border-right: 1px solid var(--border-light);
  }

  .btn-edit:hover { background: var(--maroon-muted); color: var(--maroon); }

  .btn-delete { color: #b91c1c; }

  .btn-delete:hover { background: #fef2f2; }
</style>