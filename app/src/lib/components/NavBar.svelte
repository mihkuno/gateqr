<script lang="ts">
  type Link = { label: string; href: string };
  let { title, links = [] }: { title: string; links?: Link[] } = $props();
</script>

<div class="navbar">
  <h1 class="navbar-title">{title}</h1>
  {#if links.length > 0}
    <nav class="navbar-links">
      {#each links as link}
        <a href={link.href} class="nav-link">{link.label}</a>
      {/each}
    </nav>
  {/if}
</div>

<style>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .navbar-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--maroon);
    letter-spacing: -0.01em;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.7rem;
  }

  .navbar-links {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .nav-link {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--maroon);
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    text-decoration: none;
    transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.15s;
    white-space: nowrap;
  }

  .nav-link:hover {
    background: var(--maroon);
    color: #fff;
    border-color: var(--maroon);
    transform: translateY(-1px);
  }
</style>
