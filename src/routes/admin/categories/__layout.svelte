<script>
    import { operationStore, query, mutation } from '@urql/svelte';
    import {CATEGORIES} from '$lib/queries/admin/queries'
    import {REORDER_CATEGORIES_MUTATION} from '$lib/queries/admin'
    import ListItem from '$lib/components/admin/categories/listItem.svelte';
    import SortableList from '$lib/components/Sortable.svelte';
    import {goto} from '$app/navigation'

    let categories = operationStore(CATEGORIES)

    query(categories)

    let order = []

    const sortList = ev => {
        let tempOrder = []
        console.log(ev.detail);
        ev.detail.forEach(c => {
          tempOrder.push(c.node.pk)
        })
        order = [...tempOrder]
        console.log(order)
      };

    function addNewCategory(){
      tempCategory = {
            "name": "sample category",
            "image": "",
            "sideBarText": "sample category side bar text",
            "description": "sample category description",
            "id": undefined,
            "minimumPrice": "0.00",
            "type": "A_1",
      }
    }

    function gotoCategory(category){
      goto(`/admin/categories?category=${category.id}`)
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
            <input type="text" name="search" id="search" class="focus:ring-purple-primary focus:border-purple-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md">
          </div>
          <div class="mb-3 flex items-center justify-between">
            
            <a href="/admin/categories/new" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">New category</a>
          </div>
          {#if $categories.fetching}
          <p>Loading categories</p>
          {:else if $categories.error}
          <p>{$categories.error.message}</p>
          {:else}
          <SortableList
              list={$categories?.data?.categories?.edges} 
              on:sort={sortList}
              let:item 
            >
                <ListItem 
                  {item}
                  on:clicked={gotoCategory}
                />
            </SortableList>
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