<script>
    import { operationStore, query} from '@urql/svelte'
    import {createEventDispatcher, onMount} from 'svelte'
    import {PACKAGE_DETAILS} from '$lib/queries/common'
    import {fade} from 'svelte/transition'
    import {cart, orderNavigationData as ond, selectedItem, activePackage, selectedProduct} from '$lib/stores/store'
    import {addToCart} from '$lib/utilties/cartUtils'
    import Item from '$lib/components/order/desktop/item.svelte'
    import Product from  '$lib/components/order/desktop/product.svelte'
    import Option from  '$lib/components/order/desktop/option.svelte'
    import ProductWithOptions from '$lib/components/order/desktop/productWithOptions.svelte' 
    export let p
    const {id} = p

    const dispatch = createEventDispatcher()

    let pkg = operationStore(PACKAGE_DETAILS,{id})
    query(pkg)
    function togglePopup(){
        dispatch('close')
    }

    $: {
            console.log($selectedItem);
            !$selectedItem && selectedItem.update(current => {
                return $pkg?.data?.package?.items[0]
            })
    }

    let optionsOverlayOpen = false
    $: rotate = optionsOverlayOpen ? 180 : 0;

    function toggleOptionsOverlay(e){
        optionsOverlayOpen = !optionsOverlayOpen
    }

    function handleContinueToCheckout(){
        return
    }

    // function to intialize the package
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


    onMount(() => {
        
    })

    function stopClick(){}

    function closePopup(){}
</script>

<div
	on:click|self={togglePopup}
	transition:fade
	class="fixed inset-0 flex items-center justify-center background-blur z-infinite bg-purple-primary bg-opacity-50 filter backdrop-filter backdrop-blur-sm"
>
    {#if $pkg.fetching || initial}
        <p>loading</p>
    {:else if $pkg.errors}
        <p>{$pkg.errors.message}</p>
    {:else}
    <div class="mx-2 px-4 md:px-12 rounded-3xl max-w-7xl hidden md:flex h-full md:flex-col w-full">
		<div class="flex py-5 justify-center mt-4 items-end">
			<p class="tracking-custom uppercase text-sm text-white text-center">
				cutomize your {$pkg.data.package.name} {id}
			</p>
		</div>

        <!-- inner section wrapper -->
        <div class="max-h-cart pr-3 relative md:grid-cols-3 md:gap-3 grid flex-grow">

            <!-- items list -->
            <div class="col-span-1 max-h-cart overflow-y-auto custom-scroll pr-3 bg-white rounded-xl p-3">
                {#each $pkg.data.package.items as item}
                    <Item
                        {item}
                    />
                {/each}
			</div>

            {#if optionsOverlayOpen}
                <div
                    transition:fade
                    on:click|self={toggleOptionsOverlay}
                    class="fixed bg-purple-primary bg-opacity-50 inset-0 filter backdrop-filter backdrop-blur-sm"
                />
            {/if}
            <div
				class="col-span-2 max-h-cart custom-scroll rounded-xl flex flex-col relative perspective"
				style="--r:{rotate}deg"
			>
				<div class="rotate h-full">


                    <!-- start inner front -->
					<div
                    class="inner-front max-h-cart custom-scroll bg-white rounded-xl flex flex-col topmost overflow-y-auto"
                >
                    <div class="flex items-center justify-between px-5">
                        <h2 class="text-3xl my-5 capitalize text-gold-primary">
                            Hello world
                        </h2>
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
                    <div class="flex-grow custom-scroll mr-1 overflow-y-auto">
                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 p-5 h-auto relative topmost">
                            {#each $selectedItem.products as product}
                            {#if product.options.length == 0}
                            {#key $selectedItem}
                                
                            <Product product={product} />
                            {/key}
                            {:else}
                                <ProductWithOptions 
                                    product={product} 
                                    on:open={toggleOptionsOverlay}
                                    />
                                {/if}
                            {/each}
                        </div>
                    </div>
                    <div class="flex items-end justify-between flex-shrink-0 p-8">
                        <div class="">
                            <!-- <p class="{productListRequired.some(e => e.name == selectedProduct?.product.name) && error ? 'text-red-500' : 'text-purple-primary'}">{errorMsg}</p> -->
                        </div>
                        <div class="flex flex-col justify-end items-end">
                            <!-- {#if $additional}
                            if on round 2
                                <p class="text-right text-purple-light">
                                    {selectedProduct?.product.identifier} additional total {formatter.format(productTotal)}
                                </p>
                                <p class="text-right text-purple-primary text-3xl">Total {formatter.format(packageTotal())}</p>
                            {:else if selectedProduct?.amount == undefined}
                                <p class="text-right text-purple-light">
                                    Additional total {formatter.format(additionalTotal - productTotal)}
                                </p>
                                <p class="text-right text-purple-light">
                                    {selectedProduct?.product.identifier} additional total {formatter.format(productTotal)}
                                </p>
                                <p class="text-right text-purple-primary text-3xl">Total {formatter.format(packageTotal())}</p>
                            {:else}
                                <p class="text-right text-purple-light">
                                    Additional total {formatter.format(additionalTotal)}
                                </p>
                                <p class="text-right text-purple-primary text-3xl">Total {formatter.format(packageTotal() != 0 ? packageTotal() : p.price)}</p>
                            {/if} -->
                        </div>
                    </div>
                </div>
                <!-- end inner front -->

                <!-- start inner back -->
                
					<div
					transition:fade
						class="inner-back max-h-cart custom-scroll bg-white rounded-xl flex flex-col topmost overflow-y-auto"
					>
						<div class="flex items-center justify-between px-5">
							<h2 class="text-3xl my-5 capitalize text-gold-primary">
								sample
							</h2>
							<button
								class="focus:ring-0 focus:outline-none text-gold-primary hover:bg-gold-light rounded-full"
								on:click={toggleOptionsOverlay}
							>
								<!-- <svg aria-hidden="true" focusable="false" data-prefix="fa-solid" data-icon="arrows-rotate" class="" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z" fill="currentColor"/>
                                </svg> -->
								<svg
									class="transition-all text-gold-primary p-1 fill-current w-8 h-8"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24"
                                    stroke="none"
								>
									<g id="surface1">
										<path
											style="fill:currentColor"
											d="M 21.75 0.75 C 20.921875 0.75 20.25 1.421875 20.25 2.25 L 20.25 5.722656 C 18.378906 3.117188 15.347656 1.5 12 1.5 C 7.570312 1.5 3.683594 4.328125 2.324219 8.539062 C 2.070312 9.328125 2.503906 10.175781 3.289062 10.429688 C 4.082031 10.6875 4.925781 10.25 5.179688 9.464844 C 6.136719 6.492188 8.878906 4.5 12 4.5 C 14.367188 4.5 16.511719 5.652344 17.832031 7.5 L 15.75 7.5 C 14.921875 7.5 14.25 8.171875 14.25 9 C 14.25 9.828125 14.921875 10.5 15.75 10.5 L 21.75 10.5 C 22.578125 10.5 23.25 9.828125 23.25 9 L 23.25 2.25 C 23.25 1.421875 22.578125 0.75 21.75 0.75 Z M 20.710938 13.574219 C 19.917969 13.320312 19.074219 13.753906 18.820312 14.539062 C 17.863281 17.507812 15.121094 19.5 12 19.5 C 9.632812 19.5 7.488281 18.347656 6.167969 16.5 L 8.25 16.5 C 9.078125 16.5 9.75 15.828125 9.75 15 C 9.75 14.171875 9.078125 13.5 8.25 13.5 L 2.25 13.5 C 1.421875 13.5 0.75 14.171875 0.75 15 L 0.75 21.75 C 0.75 22.578125 1.421875 23.25 2.25 23.25 C 3.078125 23.25 3.75 22.578125 3.75 21.75 L 3.75 18.277344 C 5.621094 20.882812 8.652344 22.5 11.957031 22.5 C 16.386719 22.5 20.273438 19.671875 21.632812 15.460938 C 21.933594 14.671875 21.496094 13.785156 20.710938 13.574219 Z M 20.710938 13.574219 "
										/>
									</g>
								</svg>
							</button>
						</div>
						<div class="flex-grow custom-scroll mr-1 overflow-y-auto">
							<div class="h-auto relative topmost">
								{#if optionsOverlayOpen}
                                <div class="absolute inset-0 bg-white topmost" on:click|stopPropagation={stopClick}>
                                <div class="grid grid-cols-2 lg:grid-cols-3 gap-5 p-5 h-auto">
                                    {#each $selectedProduct.options as product}
                                        <Option {product} />
                                    {/each}
                                </div>
                            </div>
                                {/if}
							</div>
						</div>
						<div class="flex items-end justify-between flex-shrink-0 p-8">
							<div class="">
								<!-- <p class="{productListRequired.some(e => e.name == selectedProduct?.product.name) && error ? 'text-red-500' : 'text-purple-primary'}">{errorMsg}</p> -->
							</div>
							<div class="flex flex-col justify-end items-end">
								<!-- {#if $additional}
									<p class="text-right text-purple-light">
										{selectedProduct?.product.identifier} additional total {formatter.format(productTotal)}
									</p>
									<p class="text-right text-purple-primary text-3xl">Total {formatter.format(packageTotal())}</p>
								{:else if selectedProduct?.amount == undefined}
									<p class="text-right text-purple-light">
										Additional total {formatter.format(additionalTotal - productTotal)}
									</p>
									<p class="text-right text-purple-light">
										{selectedProduct?.product.identifier} additional total {formatter.format(productTotal)}
									</p>
									<p class="text-right text-purple-primary text-3xl">Total {formatter.format(packageTotal())}</p>
								{:else}
									<p class="text-right text-purple-light">
										Additional total {formatter.format(additionalTotal)}
									</p>
									<p class="text-right text-purple-primary text-3xl">Total {formatter.format(packageTotal() != 0 ? packageTotal() : p.price)}</p>
								{/if} -->
							</div>
						</div>
					</div>


                    <!-- end inner back -->

                </div>
            </div>
        </div>

        <!-- buttons section -->
        <div class="hidden md:flex flex-col md:flex-row justify-center mt-5 items-end pb-12 space-x-5">
            {#if $cart.category.type != 'A_3' && !$cart?.packages?.some(pkg => p.id == pkg.id)}
				<button
					on:click={togglePopup}
					class="bg-white rounded-lg text-purple-primary p-4 tracking-widest hover:text-purple-light transition duration-150 uppercase w-full md:w-auto mt-4 md:mt-0 text-center"
					>{$cart?.category.type == 'A_2' ? 'add more items' : 'continue shopping'}</button
				>
                {/if}
                {#if $cart?.packages?.some(pkg => p.id == pkg.id) && $cart.category.type != 'A_2'}
				<a
					on:click|preventDefault={handleContinueToCheckout}
					href="/choose-time"
					class="bg-white rounded-lg text-purple-primary p-4 tracking-widest hover:text-purple-light transition duration-150 uppercase w-full md:w-auto mt-4 md:mt-0 text-center"
					>continue to checkout</a
				>
                {/if}
			
				<button
					on:click={addToCart}
					class="bg-white rounded-lg text-purple-primary p-4 tracking-widest hover:text-purple-light transition duration-150 uppercase w-full md:w-auto mt-4 md:mt-0"
					>{!$cart?.packages?.some(pkg => p.id == pkg.id) ? 'add to cart' : 'update cart'}</button
				>
		</div>
    </div>
    {/if}
</div>

<style>
	.perspective {
		perspective: 2000px;
		display: inline-block;
	}
	.rotate {
		transform: rotateY(var(--r));
		transition: transform 0.9s ease-in-out;
		transform-style: preserve-3d;
	}

	@media (prefers-reduced-motion) {
		.rotate {
			transition: transform 0s;
		}
	}
	.inner-front,
	.inner-back {
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.inner-front {
		transform: rotateY(0deg);
	}
	.inner-back {
		transform: rotateY(180deg) translateZ(1px);
	}
	.topmost {
		z-index: 9999999;
	}
</style>