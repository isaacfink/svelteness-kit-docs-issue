<script>
    export let id
    let openDetails = true
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-5 sm:px-6">
    <div class="flex items-center justify-between">
        <div class="">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Order Information</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Order #{id}.</p>
        </div>
        <div class="flex items-center space-x-5">
            <select id="status" name="status" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-primary focus:border-purple-primary sm:text-sm rounded-md">
            <option>started</option>
            <option selected>out for delivery</option>
            <option>payment error</option>
            </select>
            <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Change</button>
        </div>
    </div>
    <div>
        <div class="">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
              <!-- Current: "border-purple-primary text-purple-primary", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
              <button on:click="{() => openDetails = true}" class="{openDetails ? 'border-purple-primary text-purple-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" aria-current="page"> Order details </button>
              <button on:click="{() => openDetails = false}" class="{openDetails ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' : 'border-purple-primary text-purple-primary'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"> Order products </button>
      
      
            </nav>
          </div>
        </div>
      </div>

      {#if openDetails}
    <div class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Full name</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Margot Foster</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Arrival</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">tomorrow 10am</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Email address</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">margotfoster@example.com</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Phone number</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">781-635-1667</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Card ending in</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">****1234</dd>
        </div>
      </dl>
    </div>
    {:else}
    <p>products</p>
    {/if}
  </div>
  