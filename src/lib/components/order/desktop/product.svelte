<script>
import { activePackage, selectedItem } from '$lib/stores/store';

    export let product
    import {increase, decrease} from '$lib/utilties/cartUtils'
import { operationStore } from '@urql/svelte';
    $: isSelected = amount > 0
    let amount = 0

    activePackage.subscribe((current) => {
        amount = current.items?.find(i => i.id == $selectedItem?.id)?.products?.find(p => p.id == product.id)?.quantity || 0
    })

    function handleCheckbox(){
        console.log('checked')
    }

    function increaseAmount(){
        console.log('increase');
        increase(product)
    }

    function decreaseAmount(){
        amount > product.minimumAmount && decrease(product)
    }

    $: showNumberInput = true
</script>

    <div on:click={handleCheckbox} class="bg-gray-100 rounded-lg mb-3 overflow-hidden cursor-pointer {isSelected ? 'ring-purple-primary ring-2 ring-offset-2'  : ''}">
        <div class="aspect-w-16 aspect-h-16 relative">
            <img
                src="{product.image}"
                class="object-cover object-center"
                alt=""
            />
                {#if showNumberInput}
                    <div class="absolute bg-white border border-purple-primary px-2 h-8 w-min right-auto top-auto ml-4 mb-4 rounded text-purple-primary focus:ring-purple-primary cursor-pointer flex">
                        <button class="text-purple-primary text-2xl flex items-center justify-center" on:click={decreaseAmount}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="angle-down" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z" fill="currentColor"/></svg>
                        </button>
                        <p class="w-12 h-full border-none text-center">{amount}</p>
                        <button class="text-purple-primary text-2xl flex items-center justify-center" on:click={increaseAmount}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="angle-up" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M23.5 294.5l152-143.1C180.1 146.2 186.1 144 192 144s11.88 2.188 16.5 6.562l152 143.1c9.625 9.125 10.03 24.31 .9375 33.93c-9.125 9.688-24.38 10.03-33.94 .9375l-135.5-128.4l-135.5 128.4c-9.562 9.094-24.75 8.75-33.94-.9375C13.47 318.9 13.87 303.7 23.5 294.5z" fill="currentColor"/></svg>
                        </button>
                    </div>
                {:else}
                    <input bind:checked={isSelected} type="checkbox" class="absolute border-white h-4 w-4 left-auto top-auto mr-4 mb-4 rounded text-purple-primary focus:ring-purple-primary cursor-pointer">
                {/if}
            </div>
            <div class="flex flex-grow m-3 items-center h-12">
                <h3 class="text-purple-primary flex-grow mx-1.5">{product.name}</h3>
                <!-- <p class="text-gold-primary text-sm">+{formatter.format(v.price - selectedProduct.product.price)}</p> -->
            </div>
            <div
            class="flex border-t border-gold-primary border-dashed justify-between align-start mx-5"
            >
            <p class="text-purple-light py-2 text-xs">{product.description}</p>
        </div>
    </div>
