<script>
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    function clickEvent(){
        dispatch('delete',{
            id:item.id
        })
    }

    function clicked(){
        dispatch('clicked', {
            id: item.id
        })
    }
    export let item
</script>

<button on:click={clicked} tabindex="-1" class="py-3 px-5 w-full odd:bg-gray-100 cursor-pointer border-l-4 flex items-center justify-between">
    <div class="">
        <span>{item.id}</span>
        <span class="font-light">{item.name}</span>
    </div>

    <button on:click|preventDefault={clickEvent}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
    </button>
</button>