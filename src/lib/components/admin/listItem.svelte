<script>
    import {createEventDispatcher} from 'svelte'
    
    const dispatch = createEventDispatcher()
    
    export let item
    console.log(item)
    let {node} = item
    export let selectedItemId = 23
    
    function clickEvent(){
        dispatch('clicked',{
            id:node.pk
        })
    }
</script>

<button on:click|preventDefault = {clickEvent} tabindex="-1" class="block w-full text-left py-3 px-5 odd:bg-gray-100 cursor-pointer border-l-4 {selectedItemId == item.id ? 'border-purple-darker' : 'border-transparent'}" on:click={clickEvent}>
    <span>{node.pk}</span>
    <span class="font-light">{node.name}</span>
</button>