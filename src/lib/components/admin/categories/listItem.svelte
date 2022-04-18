<script>
    import {createEventDispatcher} from 'svelte'
    import {page} from '$app/stores'
    
    const dispatch = createEventDispatcher()
    
    export let item
    $: selected = $page.params.id == item.id
    
    function clickEvent(){
        dispatch('clicked',{
            id:node.pk
        })
    }
</script>

<a href="/admin/categories/{item.id}" tabindex="-1" class="block w-full text-left py-3 px-5 odd:bg-gray-100 cursor-pointer border-l-4 {selected? 'border-purple-darker' : ''}" on:click={clickEvent}>
    <span>{item.pk}</span>
    <span class="font-light">{item.name}</span>
</a>