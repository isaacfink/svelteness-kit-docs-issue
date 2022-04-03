<script>

    import Product from '$lib/components/admin/product.svelte'
    let products = [
        {
            id:1,
            name: 'first'
        },
        {
            id:2,
            name: 'second'
        },
        {
            id:3,
            name: 'third'
        }
    ]

    let selectedProduct = products[0]
</script>

<main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
    <!-- Start main area-->
    <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
      <div class="h-full rounded-lg">
        {#key selectedProduct}
            <Product id={selectedProduct.id}></Product>
        {/key}
      </div>
    </div>
    <!-- End main area -->
  </main>
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
          <input type="email" name="email" id="search" class="focus:ring-purple-primary focus:border-purple-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md">
        </div>
          <ol>
              {#each products as product}
                <li class="py-3 px-5 odd:bg-gray-100 cursor-pointer" on:click={() => selectedProduct = product}>
                    <span>{product.id}</span>
                    <span class="font-light">{product.name}</span>
                </li>
              {/each}
          </ol>
      </div>
    </div>
    <!-- End secondary column -->
  </aside>