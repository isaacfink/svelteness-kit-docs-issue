<script>

    import Package from '$lib/components/admin/package.svelte'
    import ListItem from '$lib/components/admin/listItem.svelte'
    import SortableList from '$lib/components/Sortable.svelte';
    import {page} from '$app/stores'
    import { query, operationStore, mutation } from '@urql/svelte';
    import {ALL_CATEGORIES, GET_CATEGORIES_ADMIN, GET_PACKAGES_ADMIN} from '$lib/queries/common'
    import {REORDER_PACKAGES_MUTATION} from '$lib/queries/admin'
    import {goto} from '$app/navigation'
import NewPackage from '$lib/components/admin/newPackage.svelte';

    console.log($page.url.searchParams.get("category"));

    let queryParams = {}
    if ($page.url.searchParams.get("category") != 'null') {
      queryParams.cat = $page.url?.searchParams?.get("category")
    }

    if($page.url.searchParams.get("package") != 'null'){
      queryParams.package = $page.url?.searchParams?.get("package")
    }

    let packages = operationStore(GET_PACKAGES_ADMIN, queryParams)

    let categories = operationStore(GET_CATEGORIES_ADMIN)
    query(packages)
    query(categories)

    let tempPackage
    let selectedPackage
    let dropdownOpen = false
    function toggleDropdown(){
        dropdownOpen = !dropdownOpen
    }

    // $: if($page){
    //   $packages.variables = {...$packages.variables, cat:$page.url.searchParams.get("category")}
    //   $packages.reexecute()
    //   dropdownOpen = false
    // }

    $: if (!$packages.fetching && !$packages.error) {
      if ($page.url.searchParams.get("category") != 'null') {
        queryParams.cat = $page.url?.searchParams?.get("category")
      }

      if($page.url.searchParams.get("package") != 'null'){
        selectedPackage = $packages.data.packages.find(pkg => pkg.id == $page.url.searchParams.get('package'))
      }
      $packages.variables = queryParams
      packages.reexecute()
      dropdownOpen = false
    }

    function addNewPackage(){
      tempPackage = {
            "name": "sample package",
            "image": "",
            "description": "sample package description",
            "id": undefined,
            "price": "0.00",
      }
    }

    let order = []

    const reorderMutation = mutation({query:REORDER_PACKAGES_MUTATION})
    function reorder() {
      console.log('reordering');
      reorderMutation({packages:order}).then(
      )
    }

    const sortList = ev => {
        let tempOrder = []
        ev.detail.forEach(c => {
          tempOrder.push({id:c.id})
        })
        order = [...tempOrder]
        reorder()
      };

  function gotoPackage(ev){
    goto(`/admin/packages?${$page.url.searchParams.get("category") ? 'category=' + $page.url.searchParams.get("category") + '&' : ''}package=${ev.detail.id}`)
  }
</script>

<aside class="relative flex flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto">
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
        <input type="email" name="email" id="search" class="focus:ring-purple-primary focus:border-purple-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md">
      </div>
      <div class="mb-3 flex items-center justify-between">
        
        <button on:click={addNewPackage} type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">New package</button>
        <div class="relative inline-block text-left">
          <div>
            <button on:click={toggleDropdown} type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-primary" id="menu-button" aria-expanded="true" aria-haspopup="true">
              Filter
              <!-- Heroicon name: solid/chevron-down -->
              <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        
          <!--
            Dropdown menu, show/hide based on menu state.
        
            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
          {#if dropdownOpen}
          <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
              <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
              {#if !$categories.fetching && !$categories.error}
              <a href="/admin/packages" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">All</a>
              {#each $categories.data.categories as category}
              <a href="?category={category.id}" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{category.name}</a>
              {/each}
              {/if}
            </div>
          </div>
          {/if}
        </div>
      </div>
      {#if $packages.fetching}
      <p>loading</p>
      {:else if $packages.error}
      <p>{$packages.error.message}</p>
      {:else}
      
        <SortableList
          list={$packages.data.packages} 
          key="id" 
          on:sort={sortList}
          let:item 
        >
            <ListItem 
              {item}
              selectedItemId = {selectedPackage?.id}
              on:clicked = {gotoPackage}
            />
        </SortableList>
        {/if}
    </div>
  </div>
  <!-- End secondary column -->
</aside>
<main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
    <!-- Start main area-->
    <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
      <div class="h-full rounded-lg">
      {#if selectedPackage}

      {#if tempPackage}
      hello
      <NewPackage />
        {:else}
        {#key selectedPackage}
            <Package id={selectedPackage?.id}></Package>
        {/key}
        {/if}
        {/if}
      </div>
    </div>
    <!-- End main area -->
  </main>