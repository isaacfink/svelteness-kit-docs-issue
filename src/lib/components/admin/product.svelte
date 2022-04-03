<script>
    import { onMount } from "svelte";
    
    
        export let id
    
        let product = {}
    
        onMount(() => {
            product = {
                id:id
            }
        })
    </script>
    
    <form class="space-y-8 divide-y divide-gray-200 pb-5">
        <div class="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Edit product</h3>
              <p class="mt-1 text-sm text-gray-500">Edit product {product.name}.</p>
            </div>
      
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input type="text" name="name" id="name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="display-name" class="block text-sm font-medium text-gray-700"> Display name </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input type="text" name="display-name" id="display-name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                </div>
                <p class="mt-2 text-sm text-gray-500">This will be displayed as name on the website.</p>
              </div>
      
              <div class="sm:col-span-6">
                <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>
                <div class="mt-1">
                  <textarea id="description" name="description" rows="3" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">Product description.</p>
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

              
              <div class="sm:col-span-1">
                <label for="min" class="block text-sm font-medium text-gray-700"> Starting price </label>
                <div class="mt-1">
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <!-- Heroicon name: solid/mail -->
                      $
                    </div>
                    <input type="number" name="price" id="min" bind:value="{product.price}" class="focus:ring-purple-primary focus:border-purple-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md">
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500">Starting price without options</p>
              </div>

              <div class="sm:col-span-2">
                <label for="min" class="block text-sm font-medium text-gray-700"> Preselected </label>
                <div class="mt-1">
                  <input id="min" type="number" name="min" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
                </div>
                <p class="mt-2 text-sm text-gray-500">Amount preselected, this only takes effect with category type prefilled</p>
              </div>
    
            </div>
          </div>
        </div>
      
        <div class="pt-5">
          <div class="flex justify-end">
            <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Cancel</button>
            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Save</button>
          </div>
        </div>
      </form>
      