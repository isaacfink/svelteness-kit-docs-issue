<script>
    import { mutation, operationStore, query } from "@urql/svelte";
    import {ALL_SCHEDULES_LIMITED, CREATE_CATEGORY} from "$lib/queries/admin";

    let pkg = {
        name:'',
        description:'',
        categoryId:'',
        price:'',
        items:[],
        image:'',

    }
    console.log(pkg)
    let selectedMenu = 'info'
    let category
    let imagesList = []

    const saveMutation = mutation({query:CREATE_CATEGORY})
    function saveChanges(){
        saveMutation({
            "categoryId": category,
            "name": pkg.name,
            "description": pkg.description,
            "price": pkg.price,
            "image": pkg.image,
            "images": generateImagesList(),
            "items":pkg.items
        })
    }

    function generateImagesList(){
        let tempList = []
        imagesList.forEach(img => {
            tempList.push({image:img})
        })
        return tempList
    }

    let newItemActive = false
    function addNewItem(){
        console.log('new item');
        newItemActive = {
            name:'',
            description:'',
            displayName:'',
            price:'',
            products:[],
        }
    }

    function saveItem(){
        pkg.items = [...pkg.items, newItemActive]
        newItemActive = undefined
        console.log(pkg)
        pkg = {...pkg}
    }

</script>

    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">New package</h3>
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


{#if selectedMenu == 'info'}
<form on:submit|preventDefault="{saveChanges}" class="space-y-8 divide-y divide-gray-200 pb-5">
    <div class="space-y-8 divide-y divide-gray-200">
    <div>
        <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">New category</h3>
        <p class="mt-1 text-sm text-gray-500">New category.</p>
        </div>
        
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-4">
            <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
            <div class="mt-1 flex rounded-md shadow-sm">
            <input bind:value={pkg.name} type="text" name="name" id="name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
            </div>
        </div>
        
        <div class="sm:col-span-6">
            <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>
            <div class="mt-1">
            <textarea bind:value={pkg.description} id="description" name="description" rows="3" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
            </div>
            <p class="mt-2 text-sm text-gray-500">Category description.</p>
        </div>

        <div class="sm:col-span-3">
            <label for="image" class="block text-sm font-medium text-gray-700"> Image </label>
            <div class="mt-1 flex items-center">
            <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </span>
            <input id="image" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">
            </div>
        </div>
        
        <div class="sm:col-span-3">
            <label for="icon" class="block text-sm font-medium text-gray-700"> Icon </label>
            <div class="mt-1 flex items-center">
            <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </span>
            <input id="file" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">
            </div>
        </div>
        
        <div class="sm:col-span-3">
            <label for="type" class="block text-sm font-medium text-gray-700"> Category type </label>
            <div class="mt-1">
            <select bind:this="{category}" id="type" name="type" autocomplete="none" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border-gray-300 rounded-md">
                <option value="1" selected={category?.id== 'A_1'}>Regular</option>
                <option value="2" selected={category?.id== 'A_2'}>Minimum amount per order</option>
                <option value="3" selected={category?.id== 'A_3'}>Prefilled</option>
            </select>
            </div>
        </div>
        
        <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Package price </label>
            <div class="mt-1">
            <input bind:value={pkg.price} id="min" type="number" name="min" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Package price before any customizations</p>
        </div>
        
        
        </div>
    </div>
    </div>
    
    <div class="pt-5">
    <div class="flex justify-end">
        <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Cancel</button>
        <button on:click|preventDefault={saveChanges} type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Save</button>
    </div>
    </div>
</form>

{:else if selectedMenu == 'items'}
{#each pkg.items as item}
<p>{item.name} item</p>
{/each}

<button on:click={addNewItem}>add new item</button>

{:else if selectedMenu == 'images'}

{/if}

{#if newItemActive}
<div on:click|self={() => newItemActive = undefined} class="fixed bg-gray-800 bg-opacity-50 inset-0 z-infinite flex items-center justify-center">
    <div class="w-auto bg-white p-5 rounded-md">
        <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">New Item</h3>
            <p class="mt-1 text-sm text-gray-500">Add new item.</p>
            </div>
            <div class="sm:col-span-4">
                <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                <input bind:value={newItemActive.name} type="text" name="name" id="name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                </div>
            </div>
            <div class="sm:col-span-4">
                <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                <input bind:value={newItemActive.displayName} type="text" name="name" id="name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                </div>
            </div>
        <div class="flex justify-end mt-3">
            <button on:click={saveItem} class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">save</button>
        </div>
    </div>
</div>
{/if}