<script>
    import { SCHEDULE } from "$lib/queries/common";
    import { UPDATE_CATEGORY, ALL_SCHEDULES_LIMITED} from "$lib/queries/admin";
    import RangeSlider from "svelte-range-slider-pips";
    import { operationStore, query, mutation } from "@urql/svelte";

    export let id

    let schedule = operationStore(SCHEDULE, { id })

    query(schedule)

    const typeTranslation = {
      "Regular":1,
      "Minimum amount per order":2,
      "Prefilled":3,
    }

    const saveMutation = mutation({query:UPDATE_CATEGORY})

    // function saveChanges(){
    //   console.log(schedule.value);
    //   saveMutation({
    //     "id": id,
    //     "name": $category.data.category.name,
    //     "description": $category.data.category.description,
    //     "sideBarText":$category.data.category.sideBarText,
    //     "minimumPrice":$category.data.category.minimumPrice,
    //     "type":typeTranslation[type.value],
    //     "schedule":schedule.value
    //   }).then(() => {
    //     $category.reexecute()
    //   })
    // }

    function saveChanges(){
        return
    }
    function formatTime(t){
      if (t == 24 || t == 0){
        return "12 am"
      }
      if (t == 12){
        return "12 pm"
      }
      if (t > 12){
        return (t-12) + " pm"
      }
      return t + " am"

    }

    let sundayRange = [$schedule?.data?.schedule?.sundayStart || 7, $schedule?.data?.schedule?.sundayEnd || 18]
    let mondayRange = [$schedule?.data?.schedule?.mondayStart || 7, $schedule?.data?.schedule?.mondayEnd || 18]
    let tuesdayRange = [$schedule?.data?.schedule?.tuesdayStart || 7, $schedule?.data?.schedule?.tuesdayEnd || 18]
    let wednesdayRange = [$schedule?.data?.schedule?.wednesdayStart || 7, $schedule?.data?.schedule?.wednesdayEnd || 18]
    let thursdayRange = [$schedule?.data?.schedule?.thursdayStart || 7, $schedule?.data?.schedule?.thursdayEnd || 18]
    let fridayRange = [$schedule?.data?.schedule?.fridayStart || 7, $schedule?.data?.schedule?.fridayEnd || 18]
    let saturdayRange = [$schedule?.data?.schedule?.saturdayStart || 7, $schedule?.data?.schedule?.saturdayEnd || 18]


</script>

{#if $schedule.fetching}
  <p>loading schedule details</p>
{:else if $schedule.errors}
  <p>{$schedule.errors.message}</p>
{:else}

  
<form on:submit|preventDefault="{saveChanges}" class="space-y-8 divide-y divide-gray-200 pb-5">
  <div class="space-y-8 divide-y divide-gray-200">
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Edit schedule</h3>
        <p class="mt-1 text-sm text-gray-500">Edit schedule {$schedule.data.schedule.name}.</p>
      </div>
      
      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input bind:value={$schedule.data.schedule.name} type="text" name="name" id="name" autocomplete="none" class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
          </div>
        </div>
        
        <!-- sunday -->
        <div class="sm:col-span-3 relative flex items-start">
          <div class="flex items-center h-5">
            <input bind:checked={$schedule.data.schedule.sundayDelivery} id="sunday-delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="sunday-delivery" class="font-medium text-gray-700">Sunday delivery</label>
            <p id="candidates-description" class="text-gray-500">Is this schedule available on sunday</p>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label for="min" class="block text-sm font-medium text-gray-700"> Sunday cutoff time </label>
          <div class="mt-1">
            <input bind:value={$schedule.data.schedule.sundayCutoff} id="min" type="number" name="sundayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
          </div>
          <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>

        <div class="sm:col-span-6 border-b border-gray-200">
          <RangeSlider range pushy pips bind:values={sundayRange} min={0} max={24} first='label' last='label' formatter={v => formatTime(v)}/>
            <p>{formatTime(sundayRange[0])} to {formatTime(sundayRange[1])}</p>
        </div>

        <!-- monday -->
        <div class="sm:col-span-3 relative flex items-start">
          <div class="flex items-center h-5">
            <input bind:checked={$schedule.data.schedule.mondayDelivery} id="monday-delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="monday-delivery" class="font-medium text-gray-700">Monday delivery</label>
            <p id="candidates-description" class="text-gray-500">Is this schedule available on monday</p>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label for="min" class="block text-sm font-medium text-gray-700"> Monday cutoff time </label>
          <div class="mt-1">
            <input bind:value={$schedule.data.schedule.mondayCutoff} id="min" type="number" name="mondayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
          </div>
          <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>

        <div class="sm:col-span-6 border-b border-gray-200">
          <RangeSlider range pushy pips bind:values={mondayRange} min={0} max={24} first='label' last='label' formatter={v => formatTime(v)}/>
            <p>{formatTime(mondayRange[0])} to {formatTime(mondayRange[1])}</p>
        </div>

        <!-- tuesday -->
        <div class="sm:col-span-3 relative flex items-start">
          <div class="flex items-center h-5">
            <input bind:checked={$schedule.data.schedule.tuesdayDelivery} id="tuesday-delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="tuesday-delivery" class="font-medium text-gray-700">Tuesday delivery</label>
            <p id="candidates-description" class="text-gray-500">Is this schedule available on tuesday</p>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label for="min" class="block text-sm font-medium text-gray-700"> Tuesday cutoff time </label>
          <div class="mt-1">
            <input bind:value={$schedule.data.schedule.tuesdayCutoff} id="min" type="number" name="tuesdayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
          </div>
          <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>

        <div class="sm:col-span-6 border-b border-gray-200">
          <RangeSlider range pushy pips bind:values={tuesdayRange} min={0} max={24} first='label' last='label' formatter={v => formatTime(v)}/>
            <p>{formatTime(tuesdayRange[0])} to {formatTime(tuesdayRange[1])}</p>
        </div>

        <!-- wednesday -->
        <div class="sm:col-span-3 relative flex items-start">
          <div class="flex items-center h-5">
            <input bind:checked={$schedule.data.schedule.wednesdayDelivery} id="wednesday-delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="wednesday-delivery" class="font-medium text-gray-700">Wednesday delivery</label>
            <p id="candidates-description" class="text-gray-500">Is this schedule available on wednesday</p>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label for="min" class="block text-sm font-medium text-gray-700"> Wednesday cutoff time </label>
          <div class="mt-1">
            <input bind:value={$schedule.data.schedule.wednesdayCutoff} id="min" type="number" name="wednesdayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
          </div>
          <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>

        <div class="sm:col-span-6 border-b border-gray-200">
          <RangeSlider range pushy pips bind:values={wednesdayRange} min={0} max={24} first='label' last='label' formatter={v => formatTime(v)}/>
            <p>{formatTime(wednesdayRange[0])} to {formatTime(wednesdayRange[1])}</p>
        </div>

        <!-- thursday -->
        <div class="sm:col-span-3 relative flex items-start">
          <div class="flex items-center h-5">
            <input bind:checked={$schedule.data.schedule.thursdayDelivery} id="thursday-delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="thursday-delivery" class="font-medium text-gray-700">Thursday delivery</label>
            <p id="candidates-description" class="text-gray-500">Is this schedule available on thursday</p>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label for="min" class="block text-sm font-medium text-gray-700"> Thursday cutoff time </label>
          <div class="mt-1">
            <input bind:value={$schedule.data.schedule.thursdayCutoff} id="min" type="number" name="thursdayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
          </div>
          <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>

        <div class="sm:col-span-6 border-b border-gray-200">
          <RangeSlider range pushy pips bind:values={thursdayRange} min={0} max={24} first='label' last='label' formatter={v => formatTime(v)}/>
            <p>{formatTime(thursdayRange[0])} to {formatTime(thursdayRange[1])}</p>
        </div>

        <!-- friday -->
        <div class="sm:col-span-3 relative flex items-start">
          <div class="flex items-center h-5">
            <input bind:checked={$schedule.data.schedule.fridayDelivery} id="friday-delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="friday-delivery" class="font-medium text-gray-700">Friday delivery</label>
            <p id="candidates-description" class="text-gray-500">Is this schedule available on friday</p>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label for="min" class="block text-sm font-medium text-gray-700"> Friday cutoff time </label>
          <div class="mt-1">
            <input bind:value={$schedule.data.schedule.fridayCutoff} id="min" type="number" name="fridayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
          </div>
          <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>

        <div class="sm:col-span-6 border-b border-gray-200">
          <RangeSlider range pushy pips bind:values={fridayRange} min={0} max={24} first='label' last='label' formatter={v => formatTime(v)}/>
            <p>{formatTime(fridayRange[0])} to {formatTime(fridayRange[1])}</p>
        </div>

        <!-- saturday -->
        <div class="sm:col-span-3 relative flex items-start">
          <div class="flex items-center h-5">
            <input bind:checked={$schedule.data.schedule.saturdayDelivery} id="saturday-delivery" aria-describedby="candidates-description" name="candidates" type="checkbox" class="focus:ring-purple-primary h-4 w-4 text-purple-primary border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="saturday-delivery" class="font-medium text-gray-700">Saturday delivery</label>
            <p id="candidates-description" class="text-gray-500">Is this schedule available on saturday</p>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label for="min" class="block text-sm font-medium text-gray-700"> Saturday cutoff time </label>
          <div class="mt-1">
            <input bind:value={$schedule.data.schedule.saturdayCutoff} id="min" type="number" name="saturdayCutoff" class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md">
          </div>
          <p class="mt-2 text-sm text-gray-500">Minimum amount per order, thid will only apply for orders with type of minimum per order</p>
        </div>

        <div class="sm:col-span-6 border-b border-gray-200">
          <RangeSlider range pushy pips bind:values={saturdayRange} min={0} max={24} first='label' last='label' formatter={v => formatTime(v)}/>
            <p>{formatTime(saturdayRange[0])} to {formatTime(saturdayRange[1])}</p>
        </div>
        
      </div>
    </div>
  </div>
  <div class="mt-6 flex items-center">
  <div class="pt-5">
    <div class="flex justify-end">
      <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Cancel</button>
      <button on:click|preventDefault={saveChanges} type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Save</button>
    </div>
  </div>
</form>
{/if}