<script>
    import {SCHEDULE} from '$lib/queries/common'
    import { orderNavigationData as ond } from '$lib/stores/store';
    import {operationStore, query} from '@urql/svelte'
    import {onMount} from 'svelte'

    export let id = 2

    let schedule = operationStore(SCHEDULE, {id})
    let dates = []
    let datesMatrix = []
    let times = []
    let spacers = []
    let today = new Date()
    let currentMonth = today.getMonth()
    let currentYear = today.getFullYear()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $: month = monthNames[currentMonth]
    $: year = currentYear

    let daysEl
    let timesEl
    let contEl

    let loadedDatesMatrix = false

    let selectedDate = new Date()
    let selectedTime

    query(schedule)


    // get times from api
    // convert to matrix
    function convertToMatrix(){
        let data = $schedule.data.schedule
        return [
            {delivery: data.sundayDelivery, start: data.sundayStart, end: data.sundayEnd, cutoff: data.sundayCutoff},
            {delivery: data.mondayDelivery, start: data.mondayStart, end: data.mondayEnd, cutoff: data.mondayCutoff},
            {delivery: data.tuesdayDelivery, start: data.tuesdayStart, end: data.tuesdayEnd, cutoff: data.tuesdayCutoff},
            {delivery: data.wednesdayDelivery, start: data.wednesdayStart, end: data.wednesdayEnd, cutoff: data.wednesdayCutoff},
            {delivery: data.thursdayDelivery, start: data.thursdayStart, end: data.thursdayEnd, cutoff: data.thursdayCutoff},
            {delivery: data.fridayDelivery, start: data.fridayStart, end: data.fridayEnd, cutoff: data.fridayCutoff},
            {delivery: data.saturdayDelivery, start: data.saturdayStart, end: data.saturdayEnd, cutoff: data.saturdayCutoff}
        ]
    }

    // add spacers
    function addSpacers(){
        spacers = []
        let firstDayOfMonth = new Date(currentYear, currentMonth, 1)
        let day = firstDayOfMonth.getDay()
        for (let i = 0; i < day; i++) {
            spacers = [...spacers, {space:true}]
        }
    }

    // function to check if date is earlier
    function isEarlier(date){
        if (date.getFullYear < today.getFullYear) {
            return true
        } else if (date.getFullYear > today.getFullYear) {
            return false
        } else {
            if (date.getMonth() < today.getMonth()) {
                return true
            } else if (date.getMonth() > today.getMonth()) {
                return false
            } else {
                if (date.getDate() < today.getDate()) {
                    return true
                } else {
                    return false
                }
            }
        }       
    }

    function isSelected(date){
        if(date.getFullYear() == selectedDate.getFullYear() && date.getMonth() == selectedDate.getMonth() && date.getDate() == selectedDate.getDate()){
            return true
        } else {
            return false
        }
    }

    // function to check if date is today
    function isToday(date){
        if(date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate()){
            return true
        } else {
            return false
        }
    }

    // function to check if end minus cutoff time is passed already
    function isCutoffPassed(){
        let latestToday = datesMatrix[today.getDay()].end - datesMatrix[today.getDay()].cutoff
        if(today.getHours() > latestToday){
            return true
        } else {
            return false
        }
    }

    // function to check if date should be enabled
    function isEnabled(date){
        if (isToday(date)) {
            return true
        }
        if(isEarlier(date, today)){
            return false
        }
        if(isToday(date) && isCutoffPassed()){
            return false
        }
        if(datesMatrix[date.getDay()].delivery == false){
            return false
        }
        return true
    }

    // format time from 24 integer to 12 hour format
    function formatTime(time){
        if(time == 0){
            return "12:00 AM"
        } else if(time == 12){
            return "12:00 PM"
        } else if(time > 12){
            return (time - 12) + ":00 PM"
        } else {
            return time + ":00 AM"
        }
    }

    // function to populate dates for each day in current month add one date object
    function populateDates(){
        dates = []
        // get number of days in current month
        let year = currentMonth != 11 ? currentYear : currentYear + 1
        let month = currentMonth != 11 ? currentMonth + 1 : 0
        let numberOfDaysInMonth = new Date(year, month, 0).getDate()

        for (let i = 0; i < numberOfDaysInMonth; i++) {
            let newDate = new Date(currentYear, currentMonth, i+1)
            dates = [...dates, {date:newDate}]
        }
        loadedDatesMatrix = true
    }

    function populateTimes(){
        times = []
        // get selected date day of week
        let dayOfWeek = selectedDate.getDay()

        let start = datesMatrix[dayOfWeek].start
        let end = datesMatrix[dayOfWeek].end - datesMatrix[dayOfWeek].cutoff

        for (let i = start; i < end; i++) {
            if (i > today.getHours() - datesMatrix[dayOfWeek].cutoff || !isToday(selectedDate)) {
                times = [...times, {time:formatTime(i), raw:i}]
            }
        }

        addSpacers()
    }

    $: {
        if (!$schedule.fetching && $schedule.data) {
            datesMatrix = convertToMatrix()
            populateDates()
            populateTimes()
        }       
    }

    function nextMonth(){
        if(currentMonth == 11){
            currentMonth = 0
            currentYear++
        } else {
            currentMonth++
        }
        populateDates()
        populateTimes()
        if (currentMonth == today.getMonth() && currentYear == today.getFullYear()) {
            selectedDate = today
        } else {
            selectedDate = new Date(currentYear, currentMonth, 1)
        }
            
    }

    function previousMonth(){
        if(currentMonth == 0){
            currentMonth = 11
            currentYear--
        } else {
            currentMonth--
        }
        populateDates()
        populateTimes()
        if (currentMonth == today.getMonth() && currentYear == today.getFullYear()) {
            selectedDate = today
        } else {
            selectedDate = new Date(currentYear, currentMonth, 1)
        }
    }

    function selectDate(date){
        selectedTime = undefined
        if (isEnabled(date.date)) {
            selectedDate = date.date
            populateDates()
            populateTimes()
            console.log(selectedDate)
        } else {
            console.log('date not enabled')
            return

        }
        timesEl.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    function selectTime(time){
        selectedTime = time
        contEl.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    function asapHandler(){
        console.log('asap handler')
    }

    function continueToCheckout(){
        return
    }

    $: cont = true

    onMount(() => {
        ond.update(() => {
            return {
                tag:'Select a time',
                headerTitle: 'Select a time',
                title: 'Select a time',
                mainText: 'When would you like to take delivery?',
                next: '/order/checkout',
                continue:false,
                showCart:true
            }
        })
    })

</script>

<div class="overflow-y-auto w-full md:mt-12 pb-12 custom-scroll mr-1">
    <div class="flex w-full flex-col  lg:flex-col-reverse justify-center overflow-y-auto">
        <div class="w-full flex justify-center my-12">
            <button class="px-5 py-2 text-white bg-purple-primary rounded-lg uppercase tracking-widest" on:click={asapHandler}>asap</button>
        </div>
        <div class="flex w-full flex-wrap flex-col px-0 sm:px-12 2xl:px-0 lg:pt-12 space-y-12 items-center justify-between 2xl:flex-row 2xl:space-y-0 2xl:space-x-12 lg:justify-center">
            <div class="date-picker mx-5 md:mx-0 w-11/12 md:w-full max-w-sm bg-white my-auto cursor-pointer select-none">
                <div bind:this="{daysEl}" class="dates bg-white shadow-xl p-10 rounded-3xl hover:shadow-2xl transition duration-150 md:h-custom">
                    <div class="month flex justify-between items-center text-purple-primary py-3 mb-3">
                        <div on:click="{previousMonth}" class="arrows w-9 h-9 flex justify-center items-center text-xl font-bold prev-month transition-all duration-150 rounded-full hover:bg-purple-primary hover:bg-opacity-20 text-purple-primary p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div class="mth font-bold uppercase tracking-widest">{month} {year}</div>
                        <div on:click="{nextMonth}" class="arrows w-9 h-9 flex justify-center items-center text-xl font-bold next-month transition-all duration-150 rounded-full hover:bg-purple-primary hover:bg-opacity-20 text-purple-primary p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                    <div class="grid grid-cols-7 gap-1 border-t border-b border-gold-primary border-dashed py-3">
                        <div class=" text-gold-primary p-3 rounded-md text-center flex justify-center items-center text-xs">SUN</div>
                        <div class=" text-gold-primary p-3 rounded-md text-center flex justify-center items-center text-xs">MON</div>
                        <div class=" text-gold-primary p-3 rounded-md text-center flex justify-center items-center text-xs">TUE</div>
                        <div class=" text-gold-primary p-3 rounded-md text-center flex justify-center items-center text-xs">WED</div>
                        <div class=" text-gold-primary p-3 rounded-md text-center flex justify-center items-center text-xs">THU</div>
                        <div class=" text-gold-primary p-3 rounded-md text-center flex justify-center items-center text-xs">FRI</div>
                        <div class=" text-gold-primary p-3 rounded-md text-center flex justify-center items-center text-xs">SAT</div>
                    </div>
                    <div class="days h-min grid grid-cols-7 mt-6 gap-2">
                        {#each spacers as spacer}
                            <div></div>
                        {/each}
                        {#if loadedDatesMatrix}
                        {#each dates as day}
                            <div on:click="{() => selectDate(day)}" class="day {!isEnabled(day.date) ? 'disabled' : ''} {isSelected(day.date) ? 'selected' : ''} {isToday(day.date) ? 'today' : ''}">{day.date.getDate()}</div>
                        {/each}
                        {/if}
                    </div>
                </div>
            </div>
            <div class="md:w-full w-11/12 mx-auto md:mx-0 max-w-sm shadow-xl 2xl:mr-auto 2xl:ml-16 my-auto rounded-3xl hover:shadow-2xl">
                <div class="h-custom p-10 uppercase tracking-widest">
                    <div class="flex justify-between items-center text-purple-primary py-3 mb-5 border-b border-gold-primary border-dashed pb-6">
                        <div class="w-9 h-9 flex justify-center items-center text-xl font-bold p-1 opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div class="font-bold uppercase tracking-widest" id="monthElementTwo">{month} {selectedDate.getDate()}</div>
                        <div class="w-9 h-9 flex justify-center items-center text-xl font-bold p-1 opacity-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                    <div bind:this="{timesEl}" class="flex flex-col pb-5 space-y-3 overflow-y-auto h-96 custom-scroll" id="times-wrapper">
                        {#each times as time}
                            <div on:click={() => selectTime(time.raw)} class="time {selectedTime == time.raw ? 'selected' : ''}" id="time">{time.time}</div>
                        {:else}
                        <div class="flex flex-col items-center justify-center">
                            <img class="p-12 h-64" src="/images/clock.svg" alt="">
                            <p class="text-center text-purple-primary text-lg">No available deliveries</p>
                            <p class="text-center text-gold-primary text-sm mt-3">Please change the date to see delivery times.</p>
                        </div>
                        {/each}
                    </div>
                </div>
            </div>
            <a bind:this="{contEl}" on:click|preventDefault="{continueToCheckout}" href='/checkout' class="rounded-full p-1 transition duration-150 {cont ? "cursor-pointer text-purple-primary hover:bg-purple-lighter active:bg-purple-primary active:text-purple-lighter" : "cursor-not-allowed text-purple-light"}">
                <svg xmlns="http://www.w3.org/2000/svg" class="transition-all rounded-full w-12 h-12 fill-current" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </a>
        </div>
    </div>
</div>

