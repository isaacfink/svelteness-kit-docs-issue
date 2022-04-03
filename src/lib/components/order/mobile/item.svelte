<script>
    export let item
    import Product from '$lib/components/order/mobile/product.svelte'
    import { selectedItem } from '$lib/stores/store';

    $: isSelected = $selectedItem?.id == item.id
    let error = false
    let count = 0
    let amount = 1
    let el

    function changeProduct(){
        selectedItem.update(current => {
            return item
        })
    }

    $: {
        if ($selectedItem?.id == item.id) {
            setTimeout(() => {
                
                el.scrollIntoView({behavior: "smooth", block: "start"})
            }, 500);
        }
    }
    
</script>

<div class="bg-gray-100 rounded-lg scroll-padding-top" bind:this={el}>
    <button on:click="{changeProduct}" class="bg-gray-100 text-purple-primary hover:text-purple-light mb-2 text-left rounded-lg p-4 tracking-widest transition duration-150 uppercase w-full mt-4 md:mt-0 focus:outline-none flex justify-between items-center">{item.name}
        <span class="ml-auto px-2 py-0.5 {error ? 'rounded-full bg-red-500 text-white' : ''}">
                <span class="ml-auto px-2 py-0.5 {error ? 'rounded-full bg-red-500 text-white' : ''}">{count}/{amount}</span>
                <span class="ml-auto px-2 py-0.5 {error ? 'rounded-full bg-red-500 text-white' : ''}">{count}</span>    
        </span>
    </button>
    {#if isSelected}
        <div class="border-t border-dashed border-purple-primary m-1">

            <p class="text-purple-primary my-5 mx-3">error message</p>

            {#if isSelected}

            {#each item.products as product}
                <Product {product}/>
              {/each}  
              {/if}
        </div>
    {/if}
</div>

<style>
    .scroll-padding-top{
        scroll-margin: 1rem;
    }
</style>