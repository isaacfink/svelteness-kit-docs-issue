<script context="module">
  export const prerender = true;
  export const load = createKitDocsLoader({
    sidebar: {
      '/': null,
      '/docs': '/docs',
    },
  });
</script>

<script>
  import '@svelteness/kit-docs/client/polyfills/index.js';
  import '@svelteness/kit-docs/client/styles/normalize.css';
  import '@svelteness/kit-docs/client/styles/fonts.css';
  import '@svelteness/kit-docs/client/styles/theme.css';
  import '@svelteness/kit-docs/client/styles/vars.css';
  import { page } from '$app/stores';
  import {
    createKitDocsLoader,
    KitDocs,
    KitDocsLayout,
    Button,
    SocialLink,
    createSidebarContext,
  } from '@svelteness/kit-docs';
  /** @type {import('@svelteness/kit-docs').MarkdownMeta} */
  export let meta;
  /** @type {import('@svelteness/kit-docs').SidebarConfig} */
  export let sidebar;
  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  
  const { activeCategory } = createSidebarContext(sidebar);
</script>

<svelte:head>
  {#key $page.url.pathname}
    <title>{$activeCategory}: {meta.title} | Svelte</title>
    <meta name="description" content={meta.description} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="og:description" content={meta.description} />
  {/key}
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout navbar={false} {sidebar}>
    <div slot="navbar-left">
      <div class="logo">
        <Button href="/">
          <!-- {@html SvelteLogo} -->
        </Button>
      </div>
    </div>

    <div class="socials" slot="navbar-right-alt">
      <SocialLink type="twitter" href="https://twitter.com/sveltejs" />
      <SocialLink type="discord" href="https://discord.com/invite/yy75DKs" />
      <SocialLink type="gitHub" href="https://github.com/sveltejs/svelte" />
    </div>

    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  .logo :global(a) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo :global(svg) {
    height: 36px;
    overflow: hidden;
  }
  .socials {
    display: flex;
    margin-right: -0.5rem;
  }
  .socials > :global(a) {
    padding: 0 0.5rem;
  }
  :global(:root) {
    --kd-color-brand-rgb: 209, 59, 18;
  }
  :global(:root.dark) {
    --kd-color-brand-rgb: 227, 105, 70;
  }
</style>