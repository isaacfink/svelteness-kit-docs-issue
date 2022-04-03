<script context="module">
    export function load({params}){
        const {id} = params;
        return {props:{id:id}}
    }
  </script>

<script>
    export let id
    import { operationStore, query, mutation } from "@urql/svelte";
    import { createEventDispatcher, onMount } from "svelte";

    import { CATEGORY } from "$lib/queries/admin/queries";
    import {UPDATE_CATEGORY} from "$lib/queries/admin/mutations";
    import ListItem from '$lib/components/admin/packages/listItem.svelte';
    import SortableList from '$lib/components/Sortable.svelte'
    import {goto} from '$app/navigation'

    let schedule
    let icon = undefined
    let selectedMenu = 'info'
    let deleteConfirmation = false

    let category = operationStore(CATEGORY, { "id":id})

    query(category)

    $: category.variables = {
      id
    }

    const saveMutation = mutation({query:UPDATE_CATEGORY})
    // const deleteMutation = mutation({query:DELETE_CATEGORY})
    // const deletePackageMutation = mutation({query:DELETE_PACKAGE})

    function saveChanges(){
      console.log($category.data.category)
      saveMutation({
        "id": id,
        "name": $category.data.category.name,
        "description": $category.data.category.description,
        "sideBarText":$category.data.category.sideBarText,
        "minimumPrice":$category.data.category.minimumPrice,
        "type":$category.data.category.type,
      }).then(() => {
        $category.reexecute()
      })
    }

    function deleteCategory(){
    //   console.log('deleteing');
    //   deleteMutation({id}).then((data) => {
    //     setTimeout(() => {
          
    //       dispatch('delete')
    //     }, 500);
    //   })
    }

    let order = []

    function sortList(ev){
      let tempOrder = []
      console.log(ev.detail)
      console.log($category.data.category.packageSet)
        ev.detail.forEach(c => {
          console.log(c)
          tempOrder.push({id:c.id})
        })
        order = [...tempOrder]
    }

    let currentPackageToDelete

    function deletePackage(){
      console.log('deleting package');
    //   deletePackageMutation(
    //     {
    //       id:currentPackageToDelete
    //     }
    //     )
    //     .then(() => {
    //     $category.reexecute()
    //     deleteConfirmation = false
    //   }
    //   )
    }

    function toggleConfirmation(e){
      deleteConfirmation = !deleteConfirmation
      currentPackageToDelete = e.detail.id
    }

    function gotoPackage(ev){
      goto(`/admin/packages?category=${id}&package=${ev.detail.id}`)
    }

    onMount(() => {
        category.variables = {
            id:id
        }
    })
    function reexecute(){
      console.log('reexecuting')
      $category.reexecute()
      console.log($category);
    }
</script>

{#if $category.fetching}
  <p>loading category details</p>
{:else if $category.errors}
  <p>{$category.errors.message}</p>
{:else}
  
<form on:submit|preventDefault="{saveChanges}" class="space-y-8 divide-y divide-gray-200 pb-5">
  <div class="space-y-8 divide-y divide-gray-200">
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Edit category</h3>
        <p class="mt-1 text-sm text-gray-500">Edit category {$category.data.category.name}.</p>
      </div>

      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button on:click|preventDefault={() => selectedMenu = 'info'} class="{selectedMenu == 'info' ? "border-purple-primary text-purple-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"> Info </button>
    
            <button on:click|preventDefault={() => selectedMenu = 'packages'} class="{selectedMenu == 'packages' ? "border-purple-primary text-purple-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"> Packages </button>
            <button on:click|preventDefault="{reexecute}">reexecute</button>
          </nav>
        </div>
      </div>
      {#if selectedMenu == 'info'}
      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input bind:value={$category.data.category.name} type="text" name="name" id="name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
          </div>
        </div>
        
        <div class="sm:col-span-6">
          <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>
          <div class="mt-1">
            <textarea bind:value={$category.data.category.description} id="description" name="description" rows="3" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
          </div>
          <p class="mt-2 text-sm text-gray-500">Category description.</p>
        </div>
        
        <div class="sm:col-span-6">
          <label for="side-bar-text" class="block text-sm font-medium text-gray-700"> Side bar text </label>
          <div class="mt-1">
            <textarea bind:value={$category.data.category.sideBarText} id="side-bar-text" name="side-bar-text" rows="3" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
          </div>
          <p class="mt-2 text-sm text-gray-500">This text will show on the side bar on this category.</p>
        </div>
        
        <div class="sm:col-span-3">
          <label for="image" class="block text-sm font-medium text-gray-700"> Image </label>
          <div class="mt-1 flex items-center">
            <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <img src="{$category.data.image}" alt="">
            </span>
            <input id="image" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">
          </div>
        </div>
        
        <div class="sm:col-span-3">
          <label for="icon" class="block text-sm font-medium text-gray-700"> Icon </label>
          <div class="mt-1 flex items-center">
            <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <img src="{$category.data.icon}" alt="">
            </span>
            <input bind:files={icon} id="file" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">
          </div>
        </div>
        
        <div class="sm:col-span-3">
          <label for="type" class="block text-sm font-medium text-gray-700"> Category type </label>
          <div class="mt-1">
            <select id="type" name="type" bind:value="{$category.data.category.type}" autocomplete="none" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border-gray-300 rounded-md">
              <option value="A_1">Regular</option>
              <option value='A_2'>Minimum amount per order</option>
              <option value='A_3'>Prefilled</option>
            </select>
          </div>
        </div>
        
        <div class="sm:col-span-3">
          <label for="min" class="block text-sm font-medium text-gray-700"> Minimum amount per order </label>
          <div class="mt-1">
            <input bind:value={$category.data.category.minimumPrice} id="min" type="number" name="min" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
          </div>
          <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>
        
        <div class="sm:col-span-3">
          <label for="schedule" class="block text-sm font-medium text-gray-700"> Category schedule </label>
          <div class="mt-1">
            <select bind:this={schedule} id="schedule" name="schedule" autocomplete="none" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border-gray-300 rounded-md">
              {#each $category?.data?.schedules?.edges || [] as schedule}
                <option selected={$category.data.category?.schedule?.id == schedule.id} value="{schedule.node.id}">{schedule.node.name}</option>
              {/each}
            </select>
          </div>
        </div>
        
      </div>
      {:else if selectedMenu == 'packages'}
      <div class="h-6"></div>
        <SortableList
        list={$category?.data?.category.packageSet.edges} 
        key="node" 
        on:sort={sortList}
        let:item 
      >
          <ListItem 
            {item}
            on:delete={(e) => toggleConfirmation(e)}
            on:clicked = {gotoPackage}
          />
      </SortableList>
      {/if}
    </div>
  </div>
  
  <div class="pt-5">
    <div class="flex justify-end">
      <button on:click|preventDefault type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Cancel</button>
      <button on:click|preventDefault={deleteCategory} type="button" class="ml-3 bg-white py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring:red-500">Delete</button>
      <button on:click|preventDefault={saveChanges} type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Save</button>
    </div>
  </div>
</form>
{/if}

{#if deleteConfirmation}
<div on:click|self={toggleConfirmation} class="inset-0 fixed bg-gray-700 bg-opacity-75 z-infinite flex items-center justify-center">
  <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <!-- Heroicon name: outline/exclamation -->
        <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Delete package?</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">Are you sure you want to delete this package? This action cannot be undone.</p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button on:click={deletePackage} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Delete</button>
      <button on:click={toggleConfirmation} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">Cancel</button>
    </div>
  </div>
</div>

{/if}
