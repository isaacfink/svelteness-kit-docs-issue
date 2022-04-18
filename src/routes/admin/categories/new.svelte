<script>
    import {goto} from '$app/navigation'
    import { mutation, operationStore, query } from "@urql/svelte";
    import {CREATE_CATEGORY} from "$lib/queries/admin/mutations";

    let types = [
        {id:'A_1', name:'regular'},
        {id:'A_2', name:'minimum amount per order'},
        {id:'A_3', name:'prefilled'},
    ]
    let schedule

    let category = {
        name:'',
        description:'',
        sideBarText:'',
        images:[],
        icon:[],
        type:'A_1',
        minimumPrice:0,
    }

    const saveMutation = mutation({query:CREATE_CATEGORY})
    function saveChanges(){
        console.log(category);
        saveMutation({
            "name": category.name,
            "description": category.description,
            "sideBarText": category.sideBarText,
            "image": category.images[0],
            "icon": category.icon[0],
            "sideBarText": category.sideBarText,
            "type":category.type,
            "minimumPrice":category.minimumPrice,
        }).then(res => {
            if (res?.error?.message == "[GraphQL] Unauthenticated!") {
                goto('/accounts/login?next=/admin/categories/new')
            }
            goto(`/admin/categories/${res.data.createCategory.category.id}`)
        })
    }

</script>


    
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
            <input bind:value={category.name} type="text" name="name" id="name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
            </div>
        </div>
        
        <div class="sm:col-span-6">
            <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>
            <div class="mt-1">
            <textarea bind:value={category.description} id="description" name="description" rows="3" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
            </div>
            <p class="mt-2 text-sm text-gray-500">Category description.</p>
        </div>
        
        <div class="sm:col-span-6">
            <label for="side-bar-text" class="block text-sm font-medium text-gray-700"> Side bar text </label>
            <div class="mt-1">
            <textarea bind:value={category.sideBarText} id="side-bar-text" name="side-bar-text" rows="3" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
            </div>
            <p class="mt-2 text-sm text-gray-500">This text will show on the side bar on this category.</p>
        </div>
        
        <div class="sm:col-span-3">
            <label for="image" class="block text-sm font-medium text-gray-700"> Image </label>
            <div class="mt-1 flex items-center">
            <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </span>
            <input bind:files="{category.images}" id="image" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">
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
            <input bind:files="{category.icon}" id="file" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">
            </div>
        </div>
        
        <div class="sm:col-span-3">
            <label for="type" class="block text-sm font-medium text-gray-700"> Category type </label>
            <div class="mt-1">
            <select bind:value="{category.type}" id="type" name="type" autocomplete="none" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border-gray-300 rounded-md">
                <option value="A_1" >Regular</option>
                <option value="A_2" >Minimum amount per order</option>
                <option value="A_3" >Prefilled</option>
            </select>
            </div>
        </div>
        
        <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Minimum amount per order </label>
            <div class="mt-1">
            <input bind:value={category.minimumPrice} id="min" type="number" name="min" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>
        
        <div class="sm:col-span-3">
            <label for="schedule" class="block text-sm font-medium text-gray-700"> Category schedule </label>
            <div class="mt-1">
            <select bind:this={schedule} id="schedule" name="schedule" autocomplete="none" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border-gray-300 rounded-md">
                <!-- {#if !$schedules.fetching && !$schedules.error}
                {#each $schedules.data.schedules as schedule}
                <option value="{schedule.id}">{schedule.name}</option>
                {/each}
                {/if} -->
            </select>
            </div>
        </div>
        
        </div>
    </div>
    </div>
    
    <div class="pt-5">
    <div class="flex justify-end">
        <a href="/admin/categories" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Cancel</a>
        <button on:click|preventDefault={saveChanges} type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Save</button>
    </div>
    </div>
</form>