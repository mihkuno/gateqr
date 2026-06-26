<script lang="ts">
  let {
    tab,
    status = '',
    onaction
  }: {
    tab: string;
    status?: string;
    onaction?: (action: string) => void;
  } = $props();

  function act(action: string) {
    onaction?.(action);
  }
</script>

<div class="action-bar">
  {#if tab === 'validation'}
    <button class="action-btn btn-reject" onclick={() => act('reject')}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      Reject
    </button>
    <button class="action-btn btn-accept" onclick={() => act('accept')}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Accept
    </button>
  {:else if tab === 'distribution'}
    <button class="action-btn btn-deliver" onclick={() => act('deliver')}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      Mark Delivered
    </button>
  {:else if tab === 'monitoring'}
    <button class="action-btn btn-revoke" onclick={() => act('revoke')}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      Revoke Access
    </button>
  {:else if tab === 'history'}
    {#if status !== 'rejected'}
      <button class="action-btn btn-revoke" onclick={() => act('retract')}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        Retract Approval
      </button>
    {/if}
  {/if}
</div>

<style>
  .action-bar {
    display: flex;
    gap: 0.625rem;
  }

  .action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
  }

  .action-btn:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .action-btn:active {
    transform: translateY(0);
  }

  .btn-reject {
    background: #fef2f2;
    color: #b91c1c;
    border: 1.5px solid #fca5a5;
  }
  .btn-reject:hover { background: #fee2e2; box-shadow: 0 2px 8px rgba(185,28,28,0.15); }

  .btn-accept {
    background: var(--maroon);
    color: #fff;
    box-shadow: 0 2px 8px rgba(107,26,42,0.3);
  }
  .btn-accept:hover { background: var(--maroon-light); }

  .btn-deliver {
    background: #f5f3ff;
    color: #6d28d9;
    border: 1.5px solid #c4b5fd;
  }
  .btn-deliver:hover { background: #ede9fe; }

  .btn-revoke {
    background: #fffbeb;
    color: #b45309;
    border: 1.5px solid #fde68a;
  }
  .btn-revoke:hover { background: #fef3c7; }
</style>
