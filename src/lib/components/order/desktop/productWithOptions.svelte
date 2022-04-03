<script>
    import { activePackage, cart, selectedItem, selectedProduct } from '$lib/stores/store';
    import {formatter} from '$lib/utilties/utils'
    import { createEventDispatcher } from 'svelte';
    
        export let product
        $: isSelected = amount > 0
        let amount = 0
    
        $: {
            amount = 0
            $activePackage.items.find(item => item.id === $selectedItem.id)?.products.forEach(product => {
                amount += (product.amount || 0)
                product.options?.forEach(option => {
                    amount += option.quantity
                })
            })
        }

        const dispatch = createEventDispatcher()
    
        function togglePopup(){
            selectedProduct.update(current => {
                return product
            })
            dispatch('open',{
                product,
            })
        }
    
        $: showNumberInput = true
    </script>
    
    <div on:click={togglePopup} class="bg-gray-100 rounded-lg mb-3 overflow-hidden cursor-pointer {isSelected ? 'ring-purple-primary ring-2 ring-offset-2'  : ''}">
        <div class="aspect-w-16 aspect-h-16">
            <img
                src="{product.image}"
                class="object-cover object-center"
                alt=""
            />
            <div class="w-5 h-5 text-white absolute border-white left-auto top-auto mr-4 mb-4 rounded focus:ring-purple-primary cursor-pointer">
                <svg aria-hidden="true" focusable="false" data-prefix="fa-solid" data-icon="arrows-rotate" class="svg-inline--fa fa-arrows-rotate fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z" fill="currentColor"/></svg>
            </div>
    
                <div class="absolute bg-white border border-purple-primary px-2 h-8 w-min right-auto top-auto ml-4 mb-4 rounded text-purple-primary focus:ring-purple-primary cursor-pointer flex">
                    <button class="text-purple-light text-2xl flex items-center justify-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="angle-down" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z" fill="currentColor"/></svg>
                    </button>
                    <p class="w-12 h-full border-none text-center">{amount}</p>
                    <button class="text-purple-light text-2xl flex items-center justify-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="angle-up" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M23.5 294.5l152-143.1C180.1 146.2 186.1 144 192 144s11.88 2.188 16.5 6.562l152 143.1c9.625 9.125 10.03 24.31 .9375 33.93c-9.125 9.688-24.38 10.03-33.94 .9375l-135.5-128.4l-135.5 128.4c-9.562 9.094-24.75 8.75-33.94-.9375C13.47 318.9 13.87 303.7 23.5 294.5z" fill="currentColor"/></svg>
                    </button>
                </div>
            </div>
            <div class="flex flex-grow m-3 items-center h-12">
                <h3 class="text-purple-primary flex-grow mx-1.5">{product.name}</h3>
                    <p class="text-gold-primary text-sm">{formatter.format(product.price)}</p>
            </div>
            <div
            class="flex border-t border-gold-primary border-dashed justify-between align-start mx-5"
            >
            <p class="text-purple-light py-2 text-xs">{product.description}</p>
        </div>
    </div>
    