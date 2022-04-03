<script>
    import {initClient} from '@urql/svelte'
    import { slide, fade } from 'svelte/transition';
    import { onMount, createEventDispatcher } from 'svelte';
    import pluralize from 'pluralize';
    import { goto } from '$app/navigation';
	import {orderNavigationData as ond, packagesInCart, cart} from '$lib/stores/store.js'
    import {removeFromCart} from '$lib/utilties/cartUtils'
import Product from '$lib/components/admin/product.svelte';

    const GRAPHQL_ENDPOINT = 'http://127.0.0.1:8000/api/'

    const client = initClient({
      url: GRAPHQL_ENDPOINT,
      fetchOptions: () => {
        return {
          method:'POST',
        }
      }
    });

    let tag = ond.tag
    let mainText = ond.mainText
    let title = ond.title
    let headerTitle = ond.headerTitle
    let next = ond.next
    let cont = ond.cont
    let showCartCheck = ond.showCart
    let checkoutUrl = ond.checkoutUrl | '/choose-time'

    const dispatch = createEventDispatcher();

	$: amountOfPackages = $packagesInCart.length

    

    // temp cont setting value

    // intl formatter for currency
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    function packageTotal(p){
        

		return 100
	}

    function additionalTotal(p){
        return packageTotal(p) - p.price
    }

    $: cartTotal = 0

    let openCart = false
    function goBack() {
        window.history.back();
    }
    function showCart() {
        openCart = !openCart
    }

    // change amount function
    function handleChange(p, e){
        let value = e?.target?.value || e
        p.amount = value
        if (value < 1) {
            packagesInCart.update((current) => {
				return current.filter(e => e.id != p.id)
			})
        }
        data.packages = packagesInCart
        localStorage.setItem('order', JSON.stringify(data))

        dispatch('cartChanged')
        pkgCount.update(e => {
            return packagesInCart.length
        })
        
    }

    // function to increase amount
    function increaseAmount(id){
        cart.update(current => {
            let currentPackage = current.packages.find(e => e.id == id)
            currentPackage.amount++
            return current
        })
    }

    // function to decrease amount
    function decreaseAmount(id){
        cart.update(current => {
            let currentPackage = current.packages.find(e => e.id == id)
            currentPackage.amount--
            if (currentPackage.amount < 1) {
                current.packages = current.packages.filter(e => e.id != id)
            }
            return current
        })
    }

    function setAmountToZero(p){
        p.amount = 0
        handleChange(p, p.amount)
    }

    onMount(() => {
        minTotal = JSON.parse(localStorage.getItem('order'))?.category?.minimumPrice || 0
		if (window.matchMedia('@media screen and (min-width:768px) and (max-width: 1930px)')) {
			// change html font size
			document.querySelector('html').style.fontSize = '16px'
		}
        console.log($cart)
    })

    let minTotal

    function handleContinueToCheckout(){
        goto(checkoutUrl)
        if (checkoutUrl == '/checkout') {
            if ($cart.packages.length < 1) {
                return
            }
        }
        if (data.category.type == '1' || data.category.type == '3'){
            if (cartTotal < 1) {
                return
            }else{
                goto(checkoutUrl)
            }
        }else if(data.category.type == '2'){
            showMinTotalError()
        }
    }

    function showMinTotalError(){
        minTotalError = !minTotalError
        minTotal = JSON.parse(localStorage.getItem('order'))?.category?.minimumPrice || 0
    }

    let minTotalError = false
</script>

<svelte:head>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIkuZPYJRywouL17_FFLvVmXPtBupGXvc&libraries=places"></script>
<meta name="theme-color" content="#ECB28B'">
</svelte:head>

<div class="bg-grey-lightest font-serif leading-normal tracking-normal overflow-y-auto xl:overflow-hidden xl:h-screen">
    <nav class="bg-gold-primary flex items-center justify-between px-8 py-6 sm:py-12 text-purple-primary sticky top-0 z-40">
        <div class="flex items-center md:space-x-5">
            <a class="hidden sm:block cursor-pointer" id="back" on:click="{goBack}">
                <svg xmlns="http://www.w3.org/2000/svg" class="transition-all duration-150 rounded-full w-8 h-8 hover:bg-purple-primary hover:bg-opacity-30 text-purple-primary p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </a>
            <a class="group" href="/">
                <svg class="h-12 w-12 icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.34 93.12">
                    <defs></defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <path style="fill:#6c2874;" d="M36.67,0A36.67,36.67,0,0,0,0,36.67V54.38C0,74.23,14.87,92,34.7,93.07c.66,0,1.32.05,2,.05A36.67,36.67,0,0,0,73.34,56.45V36.67A36.67,36.67,0,0,0,36.67,0ZM6,36.67a30.68,30.68,0,1,1,61.36,0V54.76a6.31,6.31,0,0,0-.76-.08,32.93,32.93,0,0,0-3.87.39L60.51,41.53a2.23,2.23,0,0,0-2.21-1.87,2.19,2.19,0,0,0-1.17.33l-10,6.15c-.41-.75-.76-1.52-1.25-2.24L38.63,33a2.1,2.1,0,0,0-3.49,0L27.84,43.9c-.49.72-.84,1.49-1.25,2.24L16.64,40a2.19,2.19,0,0,0-1.17-.33,2.23,2.23,0,0,0-2.21,1.87L11,55.12a32,32,0,0,0-4.29-.44c-.25,0-.48.07-.72.08,0-.13,0-.25,0-.38ZM56.85,56.33a32,32,0,0,0-6,2.53,30.3,30.3,0,0,0-1.31-7.16L55.5,48l1.35,8.28Zm-28,7.11a24.37,24.37,0,0,1,3.93-16.21l4.06-6.08L41,47.23a24.31,24.31,0,0,1,4,15.82,32.59,32.59,0,0,0-8.26,11.19A32.7,32.7,0,0,0,28.89,63.44ZM24.18,51.7a30.62,30.62,0,0,0-1.33,7.38,32.19,32.19,0,0,0-5.94-2.62.61.61,0,0,1,0-.14L18.27,48Zm-17.59,9h.16A26.73,26.73,0,0,1,33.43,86.83C20.15,85.35,9.19,74.48,6.59,60.69ZM39.91,86.8A26.74,26.74,0,0,1,66.59,60.68l.33,0A30.54,30.54,0,0,1,39.91,86.8Z"/>
                            <path class="group-hover:opacity-50 opacity-30 transition-opacity duration-75" style="fill:#6c2874" d="M6,36.67a30.68,30.68,0,1,1,61.36,0V54.76a6.31,6.31,0,0,0-.76-.08,32.93,32.93,0,0,0-3.87.39L60.51,41.53a2.23,2.23,0,0,0-2.21-1.87,2.19,2.19,0,0,0-1.17.33l-10,6.15c-.41-.75-.76-1.52-1.25-2.24L38.63,33a2.1,2.1,0,0,0-3.49,0L27.84,43.9c-.49.72-.84,1.49-1.25,2.24L16.64,40a2.19,2.19,0,0,0-1.17-.33,2.23,2.23,0,0,0-2.21,1.87L11,55.12a32,32,0,0,0-4.29-.44c-.25,0-.48.07-.72.08,0-.13,0-.25,0-.38Z"/>
                        </g>
                    </g>
                </svg>
            </a>
        </div>
        <h1 class="font-bold tracking-custom text-xs sm:text-xl uppercase">{$ond.headerTitle}</h1>
        <div class="flex items-center space-x-5">
            {#if $ond.showCart}
                
                <button class="outline-none focus:outline-none relative group" on:click|preventDefault="{showCart}">
                    <svg class="w-10 h-10 icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.53 7.59">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M8.52,1.53,7.74,4.24a.69.69,0,0,1-.68.5H2.45l.11.48H7.35a.23.23,0,0,1,.24.23.24.24,0,0,1-.24.24h-5a.24.24,0,0,1-.23-.19L1,.47H.24A.23.23,0,0,1,0,.24.24.24,0,0,1,.24,0h1a.25.25,0,0,1,.23.18L1.59,1H8.06a.47.47,0,0,1,.38.19A.42.42,0,0,1,8.52,1.53ZM8.06,1.4l-6.36,0,.65,2.85H7.06a.24.24,0,0,0,.23-.16ZM3.56,6.76a.83.83,0,0,1-1.66,0,.83.83,0,0,1,1.66,0Zm-.48,0a.36.36,0,1,0-.35.35A.36.36,0,0,0,3.08,6.76Zm4.51,0a.83.83,0,0,1-1.66,0,.83.83,0,0,1,1.66,0Zm-.48,0a.36.36,0,1,0-.35.35A.36.36,0,0,0,7.11,6.76Z" style="fill:#662874"/>
                                <path d="M8.06,1.4l-6.36,0,.65,2.85H7.06a.24.24,0,0,0,.23-.16Z" style="fill:#662874" class="child group-hover:opacity-50 opacity-30 transition-opacity duration-75"/>
                            </g>
                        </g>
                    </svg>
                    {#if $cart?.packages?.length > 0}
                        <span class="absolute rounded-full flex items-center justify-center p-1 bg-purple-primary text-gold-primary w-6 h-6 -right-2 -top-2 text-xs border border-gold-primary">{$cart.packages.length}</span>
                    {/if}
                </button>
                {:else}
                <div class="w-10"></div>
            {/if}
            <a class="hidden sm:block" href="{$ond.continue ? $ond.next : undefined}">
                <svg xmlns="http://www.w3.org/2000/svg" class="transition-all duration-150 rounded-full w-8 h-8 hover:bg-purple-primary hover:bg-opacity-30 text-purple-primary p-1 {!$ond.continue ? 'cursor-not-allowed opacity-30' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </a>
        </div>
    </nav>
    <main class="xl:flex xl:h-full xl:max-h-ros">
        <div class="px-6 py-5 bg-gray-100 text-3xl text-center xl:flex xl:flex-col xl:font-bold xl:min-w-min xl:max-w-md 2xl:max-w-xl lg:px-16 2xl:px-32 lg:items-center lg:justify-center xl:text-left xl:py-0">
            <p class="hidden xl:block text-left text-sm w-full mb-4 text-purple-primary tracking-custom uppercase">{$ond.tag}</p>
            <p class="font-medium text-xl sm:text-3xl xl:text-5xl 2xl:text-6xl">{$ond.mainText}</p>
        </div>
        <slot></slot>
    </main>
    {#if openCart}

    <div class="fixed inset-0 w-screen h-screen bg-transparent z-infinite cursor-pointer" on:click|self="{showCart}">
        <div transition:fade class="arrow hidden md:block absolute h-12 w-12 rounded-lg bg-white rotate-45 transform"></div>
        <div transition:slide class="p-5 pr-1 md:pr-5 w-full md:w-cart m-0 h-full md:max-h-fullCart max-h-screen bg-white shadow-2xl md:rounded-2xl flex-col flex fixed z-infinite top-0 md:top-40 md:right-5 cursor-default">
            <div class="flex border-b border-dashed border-gold-primary py-5 justify-between items-center overflow-y-hidden">
                <p class="tracking-custom uppercase text-sm text-purple-primary">cart</p>
                <button class="focus:ring-0 focus:outline-none" on:click={showCart}>
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
            <div class="overflow-y-auto custom-scroll pr-4 flex-grow">
                {#each $cart.packages as pkg}
                    <div class="p-5 pb-0 border-b bg-gray-50 rounded-lg mt-5">

                        <!-- header -->
                        <div class="justify-between mb-2 flex items-stretch">
                            <div class="h-24 w-24 rounded-lg overflow-hidden hidden md:block">
                                <img class="object-cover h-full" src="{pkg.image}" alt="">
                            </div>
                            <div class="flex-grow md:ml-5 mr-5 text-sm">
                                <h2 class="text-purple-primary text-2xl font-normal mr-5">{pkg.name}</h2>
                                <button on:click="{() => removeFromCart(pkg.id)}" class="underline text-purple-primary text-sm tracking-widest">REMOVE</button>
                                <p class="text-gray-500 font-normal opacity-50">Package total: {formatter.format(pkg.price)}</p>
                                <p class="text-gray-500 font-normal opacity-50">Additional total: {formatter.format(additionalTotal(pkg))}</p>
                            </div>
                            <div class="flex flex-col items-end justify-between">
                                <div class=" bg-white border border-purple-primary px-2 h-8 w-min mb-auto top-auto rounded text-purple-primary focus:ring-purple-primary cursor-pointer flex">
                                    <button class="text-purple-primary text-2xl flex items-center justify-center" on:click={() => decreaseAmount(pkg.id)}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="angle-down" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z" fill="currentColor"/></svg>
                                    </button>
                                    <p class="w-12 h-full border-none text-center">{pkg.amount}</p>
                                    <button class="text-purple-primary text-2xl flex items-center justify-center" on:click={() => increaseAmount(pkg.id)}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fa-regular" data-icon="angle-up" class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M23.5 294.5l152-143.1C180.1 146.2 186.1 144 192 144s11.88 2.188 16.5 6.562l152 143.1c9.625 9.125 10.03 24.31 .9375 33.93c-9.125 9.688-24.38 10.03-33.94 .9375l-135.5-128.4l-135.5 128.4c-9.562 9.094-24.75 8.75-33.94-.9375C13.47 318.9 13.87 303.7 23.5 294.5z" fill="currentColor"/></svg>
                                    </button>
                                </div>
                                <h2 class="text-gold-primary text-2xl font-normal mt-auto">{formatter.format(packageTotal(pkg))}</h2>
                            </div>
                        </div>


                        {#each pkg.items as item}
                            <div class="flex justify-between items-end py-3 border-t border-dashed border-gray-400 border-opacity-50">
                                <div class="text-gray-500">
                                    <h2 class="font-light mb-1 uppercase tracking-widest">{item.name}</h2>
                                    {#each item.products as product}
                        
                                        {#if product.quantity > 0}
                                            <h2 class="text-2xl">{product.quantity} {pluralize(product.name, product.quantity)}</h2>
                                            {:else}
                                            <div class="">{product.name}</div>
                                            {/if}
                                            {#each product.options || [] as option}
                                            <h2 class="text-2xl">{option.quantity} {pluralize(option.name, option.quantity)}</h2>
                                        {/each}
                                    {/each}
                                </div>
                                {#if pkg.category?.type == '3'}
                                    <p class="text-gold-primary"></p>
                                {:else}
                                    <p class="text-gold-primary">+{formatter.format(item.products?.map(e => e.price * e.amount)?.reduce((a, b) => a + b, 0) - (item.price * item.amount || 0) || 0)}</p>
                                {/if}
                            </div>
                        {/each}
                    </div>
                    {:else}
                    <div class="flex items-center justify-center mt-5">
                        <img src="/images/cart-empty.svg" alt="">
                    </div>
                {/each}
            </div>
            <div on:click|preventDefault="{handleContinueToCheckout}" class="pt-3 mt-3 border-t border-dashed border-gold-primary">
                <button class="bg-purple-primary text-white w-full rounded-lg px-3 py-4 inline-block pt-5 tracking-widest">CHECKOUT {formatter.format(cartTotal)}</button>
            </div>
        </div>
        <div class="hidden">
            <div id="order-sm"></div>
        </div>
    </div>

    {/if}
</div>

<style>
    .arrow{
        top:8.5rem;
        right: 5rem;
        z-index: 99999;
    }
</style>
