<script>
    import { operationStore, query, mutation } from '@urql/svelte';
    import {GET_SCHEDULES_ADMIN} from '$lib/queries/common'
    import ListItem from '$lib/components/admin/listItem.svelte';
    import SortableList from '$lib/components/Sortable.svelte'
    import {page} from '$app/stores'
    import { onMount } from 'svelte';
    import Schedule from '$lib/components/admin/schedule.svelte'
    import NewSchedule from '$lib/components/admin/newSchedule.svelte'

    let schedules = operationStore(GET_SCHEDULES_ADMIN)

    let selectedSchedule = $schedules?.data?.schedules[0]
    let tempSchedule

    query(schedules)

    const sortList = ev => {
        console.log(ev);
      };

    function selectSchedule(e){
      tempSchedule = undefined
      selectedSchedule = $schedules.data.schedules.find(c => c.id == e.detail.id)
    }
    function addNewSchedule(){
      tempSchedule = {
            "name": "sample schedule",
            "sundayDelivery": false,
            "sundayCutoff":1,
            "sundayStart":0,
            "sundayEnd":0,
            "mondayDelivery": false,
            "mondayCutoff":1,
            "mondayStart":0,
            "mondayEnd":0,
            "tuesdayDelivery": false,
            "tuesdayCutoff":1,
            "tuesdayStart":0,
            "tuesdayEnd":0,
            "wednesdayDelivery": false,
            "wednesdayCutoff":1,
            "wednesdayStart":0,
            "wednesdayEnd":0,
            "thursdayDelivery": false,
            "thursdayCutoff":1,
            "thursdayStart":0,
            "thursdayEnd":0,
            "fridayDelivery": false,
            "fridayCutoff":1,
            "fridayStart":0,
            "fridayEnd":0,
            "saturdayDelivery": false,
            "saturdayCutoff":1,
            "saturdayStart":0,
            "saturdayEnd":0,
      }
    }

    $:{
      if (!selectedSchedule) {
        selectedSchedule = $schedules?.data?.schedules?.find(c => c.id == $page.url.searchParams.get("schedule") || undefined)
      }
    }
</script>

<main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
    <!-- Start main area-->
    <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
      <div class="h-full rounded-lg">
        {#key selectedSchedule}

        {#if tempSchedule}
          <NewSchedule schedule={tempSchedule}/>
        {:else}
          {#if selectedSchedule}
            <Schedule id={selectedSchedule.id}></Schedule>
          {/if}
          {/if}
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
          <input type="text" name="search" id="search" class="focus:ring-purple-primary focus:border-purple-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="mb-3 flex items-center justify-between">
          
          <button on:click={addNewSchedule} type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">New schedule</button>
        </div>
        {#if $schedules.fetching}
        <p>Loading schedules</p>
        {:else if $schedules.error}
        <p>{$schedules.error.message}</p>
        {:else}
        <SortableList
            list={$schedules?.data?.schedules} 
            key="id" 
            on:sort={sortList}
            let:item 
          >
              <ListItem 
                {item}
                selectedItemId = {selectedSchedule?.id}
                on:select={(e) => selectSchedule(e)}
              />
          </SortableList>
          {/if}
      </div>
    </div>
    <!-- End secondary column -->
  </aside>