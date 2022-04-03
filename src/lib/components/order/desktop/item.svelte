<script>
    export let item
    import {activePackage, selectedItem} from '$lib/stores/store'
    function changeItem(){
        selectedItem.update((current) => {
            return item
        })
    }
    let count = 0
    $: {
        let total = 0
        $activePackage.items?.find(i => i.id == item.id)?.products?.forEach(p => {
            total += (p.quantity || 0)
            p.options?.forEach(o => {
                total += o.quantity
            })
        })
        count = total
    }
    $: error = false
</script>

<button on:click="{changeItem}" class="{$selectedItem?.id == item.id ? 'bg-purple-primary text-white' :'bg-gray-100 text-purple-primary hover:text-purple-light'} mb-2 text-left rounded-lg p-4 tracking-widest transition duration-150 uppercase w-full mt-4 md:mt-0 focus:outline-none flex justify-between items-center">
    {item.displayName}
    <!-- {#if type == '3' && error}
        <span class="ml-auto px-2 py-0.5 rounded-full bg-red-500 text-white h-6 w-6 flex items-center justify-center">!</span> 
    {:else if type == '3'}
       <span></span>
    {:else if !optional && !$additional}
        <span class="ml-auto px-2 py-0.5 {error ? 'rounded-full bg-red-500 text-white' : ''}">{count}/{amount}</span>
    {:else if optional || $additional}
        <span class="ml-auto px-2 py-0.5 {error ? 'rounded-full bg-red-500 text-white' : ''}">{count}</span>    
        {/if} -->
        <span class="ml-auto px-2 py-0.5 {error ? 'rounded-full bg-red-500 text-white' : ''}">{count}</span>    
</button>