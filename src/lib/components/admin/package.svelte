<script>
  import { createEventDispatcher, onMount } from "svelte";
  import PackageImages from '$lib/components/admin/packageImages.svelte'
  import { operationStore, query } from "@urql/svelte";
  import { PACKAGE } from "$lib/queries/admin/queries";
  import Dropzone from "svelte-file-dropzone";
  import ListItem from '$lib/components/admin/listItemPackage.svelte';
  import SortableList from '$lib/components/Sortable.svelte'
  import {goto} from '$app/navigation'
  export let id
  
  let selectedMenu = 'info'
  let deletedImages = []  
  let addedImages = []
  
  let pkg = operationStore(PACKAGE, {id})
  query(pkg)

  const dispatch = createEventDispatcher()

  let files = {
      accepted: [],
      rejected: []
  };

  function handleFilesSelect(e) {
      const { acceptedFiles, fileRejections } = e.detail;
      files.accepted = [...files.accepted, ...acceptedFiles];
      files.rejected = [...files.rejected, ...fileRejections];
      console.log(files);
  }

  // items functionality
  function sortItems(){
    console.log('sorting item')
  }

  function handleDeleteConfirmation(){
    console.log('delete confirmation')
  }

  function gotoItem(ev){
    goto(`/admin/items/?item=${ev.detail.id}`)
  }
</script>
    

<form class="space-y-8 divide-y divide-gray-200 pb-5">
  <div class="space-y-8 divide-y divide-gray-200">
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Edit package</h3>
        <p class="mt-1 text-sm text-gray-500">Edit package {pkg.name} #{pkg.id}.</p>
      </div>
      <div>
        <div class="hidden sm:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
              <!-- Current: "border-purple-primary text-purple-primary", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
              <button on:click|preventDefault={() => selectedMenu = 'info'} class="{selectedMenu == 'info' ? "border-purple-primary text-purple-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"> Info </button>
      
              <button on:click|preventDefault={() => selectedMenu = 'images'} class="{selectedMenu == 'images' ? "border-purple-primary text-purple-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"> Images </button>
      
              <button on:click|preventDefault={() => selectedMenu = 'items'} class="{selectedMenu == 'items' ? "border-purple-primary text-purple-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"> Items </button>
      
            </nav>
          </div>
        </div>
      </div>
      {#if $pkg.fetching}
        <p>Loading package details</p>
      {:else if $pkg.error}
        <p>Error loading package details</p>
        <p>{$pkg.errors.message}</p>
      {:else}
        {#if selectedMenu == 'info'}

          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="name" id="name" autocomplete="none" bind:value={pkg.data.package.name} class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
              </div>
            </div>
        
            <div class="sm:col-span-6">
              <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>
              <div class="mt-1">
                <textarea id="description" name="description" rows="3" bind:value={pkg.data.package.description} class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">Package description.</p>
            </div>
        
            <div class="sm:col-span-3">
              <label for="image" class="block text-sm font-medium text-gray-700"> Image </label>
              <div class="mt-1 flex items-center">
                <span class="h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                  <img src="{pkg.data.package.image}" alt="">
                </span>
                <input id="image" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">
              </div>
            </div>
      
            <div class="sm:col-span-3">
              <label for="icon" class="block text-sm font-medium text-gray-700"> Icon </label>
              <div class="mt-1 flex items-center">
                <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <img src="{pkg.data.package.icon}" alt="">
                </span>
                <input id="file" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">
              </div>
            </div>
                
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <!-- Heroicon name: solid/mail -->
                  $
                </div>
                <input type="number" name="price" id="price" bind:value="{pkg.data.package.price}" class="focus:ring-purple-primary focus:border-purple-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

          </div>
          {:else if selectedMenu == 'images'}
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {#each pkg.data.package?.images || [] as image}
              <div class="rounded-md relative flex items-center justify-center group aspect-1 overflow-hidden">
                <img src="{image.image}" alt="" class="absolute inset-0">
                <button on:click={() => deletedImages.push(image.id)} type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 group-hover:z-40">
                  Delete
                  <!-- Heroicon name: solid/mail -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            {/each}
            <div class="col-span-6">
              <Dropzone on:drop={handleFilesSelect} />
              <p class="my-3 text-gray-800">Added images</p>
          </div>
        </div>
        
        {:else if selectedMenu == 'items'}
          <p>items</p>
          <SortableList
            list={pkg.data.package?.items || []}
            key="id"
            on:sort={sortItems}
            let:item
          >
            <ListItem
              {item}
              on:delete = {handleDeleteConfirmation}
              on:clicked = {gotoItem}
            />
            </SortableList>

        {/if}
      {/if}
    </div>
  </div>
  
  <div class="pt-5">
    <div class="flex justify-end">
      <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Cancel</button>
      <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Save</button>
    </div>
  </div>
</form>
      