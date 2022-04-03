<script>
    import { operationStore, query} from '@urql/svelte'
    import {PACKAGE_DETAILS} from '$lib/queries/common'
    import {fade} from 'svelte/transition'
    import {createEventDispatcher, onMount} from 'svelte'
    import {formatter} from '$lib/utilties/utils'
    import Item from '$lib/components/order/mobile/item.svelte'
    export let p
    import {addToCart} from '$lib/utilties/cartUtils'
    import {cart, activePackage, selectedItem} from '$lib/stores/store'
    const {id} = p
    let el

    const dispatch = createEventDispatcher()

    let pkg = operationStore(PACKAGE_DETAILS,{id})
    query(pkg)
    function togglePopup(){
        dispatch('close')
    }

    // temp values
    let packageTotal = 0

    function handleOptionsPopup(e){
        return
    }

    function initPackage(){
        initial = false
        let currentPackage = $cart?.packages?.find(pkg => p.id == pkg.id)
        if (currentPackage){
            activePackage.update(current => {
                return currentPackage
            })
        }else{
            let items = []
            // if on type 3
            if ($cart.category.type == 'A_3') {
                items = initTypeThree()
                console.log(items)
            }
            activePackage.update(current => {
                return {
                    id:p.id,
                    name:p.name,
                    price:p.price,
                    description:p.descriptio,
                    image:p.image,
                    amount:1,
                    items:items
                }
            })
        }
    }

    let initial = true

    $: $pkg.fetching == false && initial && initPackage()
        
    function initTypeThree(){
        let items = []
        $pkg.data.package.items.forEach(item => {
            let i = {
                id:item.id,
                name:item.name,
                price:item.price,
                description:item.description,
                image:item.image,
                products:[]
            }
            item.products.forEach(product => {
                if (product.minimumAmount > 0) {
                    let p = {
                        id:product.id,
                        name:product.name,
                        price:product.price,
                        description:product.description,
                        image:product.image,
                    }
                    if (product.options.length == 0) {
                        p.quantity = product.minimumAmount
                        items.push(p)
                    }else{
                        p.options = []
                        product.options.forEach(option => {
                            if (option.minimumAmount > 0) {
                                p.options.push(
                                    {
                                        id:option.id,
                                        name:option.name,
                                        price:option.price,
                                        description:option.description,
                                        image:option.image,
                                        quantity:option.minimumAmount
                                    }
                                )
                            }
                        })
                    }
                    i.products.push(p)
                }

            })
            items.push(i)
        })
        return items
    }

</script>


<!-- svelte-ignore missing-declaration -->
<div on:click|self={togglePopup} transition:fade class="fixed bg-white inset-0 z-infinite p-2 flex flex-col" >
    <div class="flex items-center justify-between pb-5 border-b border-gold-primary border-dashed">
        <p class="tracking-custom uppercase text-sm text-purple-primary">
            heading text
        </p>
        <button class="focus:ring-0 focus:outline-none" on:click={togglePopup}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="transition-all rounded-full w-8 h-8 hover:bg-gold-light text-gold-primary p-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    </div>

    <!-- buttons -->
    <div class="overflow-y-auto h-auto flex flex-col justify-between flex-grow">
		<div class="flex-grow" bind:this={el}>
			{#if $pkg.loading}
            <p>loading</p>
            {:else if $pkg.errors}
            <p>{$pkg.errors}</p>
            {:else}
				{#each $pkg?.data?.package?.items || [] as item}
					<Item
						{item}
					/>
				{/each}
			{/if}
		</div>
		<!-- <div class="text-center">
			<p class="text-purple-primary my-3">Additional total {formatter.format(packageTotal() - p.price)}</p>
			<p class="text-purple-primary text-xl">Package total {formatter.format(packageTotal())}</p>
		</div> -->
		<div class="flex flex-col justify-center my-3 items-end space-x-3">
			<a
			href="/choose-time"
			class="bg-purple-primary rounded-lg text-white p-3 text-base tracking-widest hover:text-purple-light transition duration-150 uppercase w-full md:w-auto mt-4 md:mt-0 text-center"
			>continue</a
			>
			<button
			on:click={addToCart}
			class="bg-purple-primary rounded-lg text-white p-3 text-base tracking-widest hover:text-purple-light transition duration-150 uppercase w-full md:w-auto mt-4 md:mt-0"
			>add to cart</button
			>
			<button
				on:click={togglePopup}
				class="bg-white border-2 border-purple-primary rounded-lg text-purple-primary p-3 text-base tracking-widest hover:text-purple-light transition duration-150 uppercase w-full md:w-auto mt-4 md:mt-0 text-center"
				>continue shopping</button
			>
		</div>
	</div>

</div>
