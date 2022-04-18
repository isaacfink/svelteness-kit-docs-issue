<script>
  import { operationStore, query, mutation } from '@urql/svelte';
  import {PACKAGES} from '$lib/queries/admin/queries'
  import DragDrop from "$lib/components/admin/packages/DragDrop.svelte";
  import {REORDER_PACKAGES} from '$lib/queries/admin/mutations'
  import {page} from '$app/stores'

  let packages = operationStore(PACKAGES, {search:""})

  query(packages)

  let search = ""
  function serachQuery(){
    $packages.variables.search = search
    $packages.reexecute()
  }

  let dropdownOpen = false

  function toggleDropdown(){
    dropdownOpen = !dropdownOpen
  }

  </script>
  <aside class="relative order-first flex flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto">
    <!-- Start secondary column (hidden on smaller screens) -->
    <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
      <div class="h-full rounded-lg">
        <label for="search" class="block text-sm font-medium text-gray-700 mt-3">Search</label>
        <div class="mt-1 relative rounded-md shadow-sm mb-3">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <!-- Heroicon name: solid/mail -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <form on:submit|preventDefault={serachQuery}>
            <input type="text" name="search" bind:value="{search}" id="search" class="focus:ring-purple-primary focus:border-purple-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md">
          </form>
        </div>
        <div class="mb-3 flex items-center justify-between">
          
          <a href="/admin/packages/new" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">New package</a>
          <div class="relative inline-block text-left">
            <div>
              <button on:click={toggleDropdown} type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-primary" id="menu-button" aria-expanded="true" aria-haspopup="true">
                Filter
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          
            {#if dropdownOpen}
            <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1" role="none">
                <a href="/admin/packages" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">All</a>
                {#each $packages.data.categories.edges as category}
                <a href="?category={category.node.id}" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{category.node.name}</a>
                {/each}
              </div>
            </div>
            {/if}
          </div>
        </div>
        {#if $packages.fetching}
        <p>Loading packages</p>
        {:else if $packages.error}
        <p>{$packages.error.message}</p>
        {:else}
        <p class="mb-2">{$packages.data.packages.edges.length} packages</p>
          {#each $packages.data.packages.edges as item}
          <div
          class="block w-full text-left item bg-gray-100 cursor-pointer border-l-4 mb-1 {$page.params.id == item.node.id ? 'border-purple-darker': ''}"
        >
  
            <a
              href="/admin/packages/{item.node.id}"
              tabindex="-1"
              class="block w-full text-left py-3 px-5 odd:bg-gray-100 cursor-pointer"
            >
              <span>{item.node.pk}</span>
              <span class="font-light">{item.node.name}</span>
            </a>
        </div>
          {/each}
        {/if}
      </div>
    </div>
    <!-- End secondary column -->
  </aside>

<main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
  <!-- Start main area-->
  <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
    <div class="h-full rounded-lg">
        <slot />
    </div>
  </div>
  <!-- End main area -->
</main>
