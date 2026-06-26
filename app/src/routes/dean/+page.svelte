<script lang="ts">
    import AppShell from '$lib/components/AppShell.svelte';
    import TabBar from '$lib/components/TabBar.svelte';
    import ApplicationCard from '$lib/components/ApplicationCard.svelte';
    import ActionBar from '$lib/components/ActionBar.svelte';
    import { invalidateAll } from '$app/navigation';

    let { data } = $props();
    let apps = $derived(data.applications || []);
    
    let tab = $state('validation');
    const tabs = ['validation', 'history'];

    let displayedApps = $derived(
        tab === 'validation' 
            ? apps.filter(a => a.status === 'dept_val') 
            : apps.filter(a => a.status !== 'dept_val')
    );

    async function handleAction(registration_id: number, action: string) {
        let reason = '';
        if (action === 'reject' || action === 'revoke') {
            reason = prompt(`Please provide a reason to ${action}:`);
            if (reason === null) return; // cancelled
        }

        try {
            const res = await fetch('/api/dean/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ registration_id, action, reason })
            });

            if (res.ok) {
                await invalidateAll();
            } else {
                const err = await res.json();
                alert(err.error || 'Action failed');
            }
        } catch (e) {
            alert('Network error');
        }
    }
</script>

<svelte:head>
  <title>Dean Review — GateQR</title>
  <meta name="description" content="Review and approve vehicle sticker applications for your college department." />
</svelte:head>

<AppShell>
  <div class="page-header">
    <div class="page-badge">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 13.5 19.79 19.79 0 0 1 1.08 4.9 2 2 0 0 1 3.06 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18a2 2 0 0 1 2 2z"/></svg>
      College Head Portal
    </div>
  </div>

  <TabBar {tabs} active={tab} onchange={(t) => tab = t} />

  <div class="cards-list">
    {#each displayedApps as app}
      <ApplicationCard data={{
        id: app.id || '-',
        name: `${app.first_name} ${app.last_name}`,
        role: app.role,
        email: app.user_email,
        department: app.department_name || '-',
        dean: app.department_email || '-',
        vehicle: app.vehicle_make,
        plate: app.vehicle_plate,
        owner: app.is_owner ? 'Yes' : 'No',
        status: app.status,
        rejection_reason: app.invalid_reason || null,
        documents: {
          id: app.doc_id,
          enrollment: app.doc_load,
          or: app.doc_or,
          cr: app.doc_cr,
          license: app.doc_license,
          letter: app.doc_letter
        }
      }}>
        {#snippet children()}
          <ActionBar {tab} status={app.status} onaction={(action) => handleAction(app.auto_id, action)} />
        {/snippet}
      </ApplicationCard>
    {:else}
      <p class="empty-state">No applications found.</p>
    {/each}
  </div>
</AppShell>

<style>
  .page-header {
    display: flex;
    align-items: center;
  }

  .page-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--maroon);
    background: var(--maroon-muted);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 0.3rem 0.75rem;
  }

  .cards-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-top: 1rem;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    background: var(--surface);
    border: 1.5px dashed var(--border);
    border-radius: var(--radius-md);
  }
</style>