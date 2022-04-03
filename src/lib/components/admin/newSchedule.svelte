
<script>
    export let schedule

    function saveChanges(){
        return
    }
</script>
<form on:submit|preventDefault="{saveChanges}" class="space-y-8 divide-y divide-gray-200 pb-5">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Edit schedule</h3>
          <p class="mt-1 text-sm text-gray-500">Edit schedule {schedule.name}.</p>
        </div>
        
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input bind:value={schedule.name} type="text" name="name" id="name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
            </div>
          </div>
          
          <!-- sunday -->
          <div class="sm:col-span-3 relative flex items-start">
            <div class="flex items-center h-5">
              <input bind:checked={schedule.sundayDelivery} id="sunday_delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="sunday-delivery" class="font-medium text-gray-700">Sunday delivery</label>
              <p id="candidates-description" class="text-gray-500">Is this schedule available on sunday</p>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Sunday cutoff time </label>
            <div class="mt-1">
              <input bind:value={schedule.sundayCutoff} id="min" type="number" name="sundayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
          </div>
  
          <!-- monday -->
          <div class="sm:col-span-3 relative flex items-start">
            <div class="flex items-center h-5">
              <input bind:checked={schedule.mondayDelivery} id="monday_delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="monday-delivery" class="font-medium text-gray-700">Monday delivery</label>
              <p id="candidates-description" class="text-gray-500">Is this schedule available on monday</p>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Monday cutoff time </label>
            <div class="mt-1">
              <input bind:value={schedule.mondayCutoff} id="min" type="number" name="mondayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
          </div>
  
          <!-- tuesday -->
          <div class="sm:col-span-3 relative flex items-start">
            <div class="flex items-center h-5">
              <input bind:checked={schedule.tuesdayDelivery} id="tuesday_delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="tuesday-delivery" class="font-medium text-gray-700">Tuesday delivery</label>
              <p id="candidates-description" class="text-gray-500">Is this schedule available on tuesday</p>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Tuesday cutoff time </label>
            <div class="mt-1">
              <input bind:value={schedule.tuesdayCutoff} id="min" type="number" name="tuesdayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
          </div>
  
          <!-- wednesday -->
          <div class="sm:col-span-3 relative flex items-start">
            <div class="flex items-center h-5">
              <input bind:checked={schedule.wednesdayDelivery} id="wednesday_delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="wednesday-delivery" class="font-medium text-gray-700">Wednesday delivery</label>
              <p id="candidates-description" class="text-gray-500">Is this schedule available on wednesday</p>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Wednesday cutoff time </label>
            <div class="mt-1">
              <input bind:value={schedule.wednesdayCutoff} id="min" type="number" name="wednesdayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
          </div>
  
          <!-- thursday -->
          <div class="sm:col-span-3 relative flex items-start">
            <div class="flex items-center h-5">
              <input bind:checked={schedule.thursdayDelivery} id="thursday_delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="thursday-delivery" class="font-medium text-gray-700">Thursday delivery</label>
              <p id="candidates-description" class="text-gray-500">Is this schedule available on thursday</p>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Thursday cutoff time </label>
            <div class="mt-1">
              <input bind:value={schedule.thursdayCutoff} id="min" type="number" name="thursdayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
          </div>
  
          <!-- friday -->
          <div class="sm:col-span-3 relative flex items-start">
            <div class="flex items-center h-5">
              <input bind:checked={schedule.fridayDelivery} id="friday_delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="friday-delivery" class="font-medium text-gray-700">Friday delivery</label>
              <p id="candidates-description" class="text-gray-500">Is this schedule available on friday</p>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Friday cutoff time </label>
            <div class="mt-1">
              <input bind:value={schedule.fridayCutoff} id="min" type="number" name="fridayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
          </div>
  
          <!-- saturday -->
          <div class="sm:col-span-3 relative flex items-start">
            <div class="flex items-center h-5">
              <input bind:checked={schedule.saturdayDelivery} id="saturday_delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="saturday-delivery" class="font-medium text-gray-700">Saturday delivery</label>
              <p id="candidates-description" class="text-gray-500">Is this schedule available on saturday</p>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="min" class="block text-sm font-medium text-gray-700"> Saturday cutoff time </label>
            <div class="mt-1">
              <input bind:value={schedule.saturdayCutoff} id="min" type="number" name="saturdayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
            </div>
            <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
          </div>
          
        </div>
      </div>
    </div>
    <div class="mt-6 flex items-center">
      <!-- <div class="relative flex items-start">
      </div>
      <RangeSlider range pushy values={[0, 24]} pips all='label' pipstep="{1}" min="{0}" max="{24}" formatter={v => formatTime(v)}/>
    </div> -->
    <div class="pt-5">
      <div class="flex justify-end">
        <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Cancel</button>
        <button on:click|preventDefault={saveChanges} type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Save</button>
      </div>
    </div>
  </form>