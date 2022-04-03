<script>
    import { activePackage, selectedItem } from '$lib/stores/store';

    export let product
    import {increase, decrease} from '$lib/utilties/cartUtils'
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
    <div class="bg-white rounded-lg mb-5 overflow-hidden m-1 {isSelected ? 'ring-purple-primary ring-2 ring-offset-2'  : ''}">
        <div class="flex items-center w-full justify-between border-b border-dashed border-purple-dark">
            <h3 class="text-purple-primary line-clamp-1 p-2">{product.name}</h3>
        </div>
        <div class="flex">
            <div class="relative h-28 w-28 flex-shrink-0">
                <img
                    src="http://picsum.photos/200/200"
                    class="object-cover object-center w-28"
                    alt=""
                />
                    <input bind:checked={isSelected} type="checkbox" class="absolute border-white h-4 w-4 bottom-2 left-2 rounded text-purple-primary focus:ring-purple-primary cursor-pointer">
            </div>
            <div class="p-2 flex-grow-1 w-full flex flex-col justify-between">
                <div
                class="flex justify-between align-start w-full"
                >
                <p class="text-purple-light text-xs line-clamp-2">{product.description}</p>
                </div>
                <div class="flex items-center justify-between w-full">
                            <div class="bg-white border border-purple-primary px-2 h-7 w-min right-auto top-auto rounded text-purple-primary focus:ring-purple-primary cursor-pointer flex">
                                <button class="text-purple-primary text-2xl flex items-center justify-center" on:click={decreaseAmount}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="angle-down" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z" fill="currentColor"/></svg>
                                </button>
                                <p class="w-8 h-full border-none text-center p-0">{amount}</p>
                                <button class="text-purple-primary text-2xl flex items-center justify-center" on:click={increaseAmount}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="angle-up" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M23.5 294.5l152-143.1C180.1 146.2 186.1 144 192 144s11.88 2.188 16.5 6.562l152 143.1c9.625 9.125 10.03 24.31 .9375 33.93c-9.125 9.688-24.38 10.03-33.94 .9375l-135.5-128.4l-135.5 128.4c-9.562 9.094-24.75 8.75-33.94-.9375C13.47 318.9 13.87 303.7 23.5 294.5z" fill="currentColor"/></svg>
                                </button>
                            </div>
                    <!-- {#if $additional || optional}
                        <p class="text-gold-primary text-xs">+{formatter.format(v.price)}</p>
                    {:else}
                        <p class="text-gold-primary text-xs">+{formatter.format(v.price - selectedProduct.product.price)}</p>
                    {/if} -->
                </div>
                <p>{product.minimumAmount}</p>
            </div>
        </div>
    </div>