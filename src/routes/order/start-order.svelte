<script>
    import {onMount, tick} from 'svelte'
    import {goto} from '$app/navigation'
    import {orderNavigationData as ond} from '$lib/stores/store.js'
    import {fade} from 'svelte/transition'
    import {validatePhoneNumber, validateEmail, distance} from '$lib/utilties/utils.js'

    onMount(() => {
        ond.update(() => {
            return {
                tag:'delivery type',
                headerTitle: 'start your order',
                title: 'Delivery type',
                mainText: 'How would you like to get your order?',
                next: '/order/choose-category',
                continue:false
            }
        })
    })

    $: {
        if (selected == 'pickup') {
            ond.update((current) => {
                current.continue = true
                return current
            })
        }
    }

    // form actions
    let form
    let errors = {}

    let openForm = false
    function toggleForm() {
        openForm = !openForm
        if (openForm) {
            initAutocomplete()
        }
    }

    let delivery = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        gift: false,
        giftMessage: '',
        giftFrom: '',
        giftTo: '',
        delivery: undefined,
    }

    let selected

    function selectDelivery(){
        if (validateForm()) {
            delivery.address = addressInputContainer.value
        }
        selected = 'delivery'
        delivery.delivery = true
        goto('/order/choose-category')
    }

    function selectPickup(){
        selected = 'pickup'
        goto('/order/choose-category')
    }

    function validateForm(){
        errors = {}
        if (delivery.firstName.length < 3) {
            errors.firstName = 'First name must be at least 3 characters'
            return false
        }
        if (delivery.lastName.length < 3) {
            errors.lastName = 'Last name must be at least 3 characters'
            return false
        }

        if (!validatePhoneNumber(delivery.phone)) {
            errors.phone = 'Phone number must be valid'
            return false
        }

        if (!validateEmail(delivery.email)) {
            errors.email = 'Email is not valid'
            return false
        }

        if (!onPlaceChange()) {
            errors.address = "Address is too far from store"
            return false
        }
        return true
    }

    // autocomplete setup
    let autoComplete
    let addressInputContainer
    const center = { lat: 41.11096954345703, lng: -74.06905364990234 };
    const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
        };
    const options = {
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        types: ["address"],
        };
    async function initAutocomplete(){
        await tick()
        addressInputContainer = document.getElementById('addressInputContainer')
        autoComplete = new google.maps.places.Autocomplete(addressInputContainer, options);
        autoComplete.setFields(["address_component", "formatted_address"])
    }


    function onPlaceChange(){
        let place = autoComplete.getPlace()
        if (!place || !place.geometry) {
            return false
        }
        delivery.address = addressInputContainer.value
        delivery.lat = place.geometry.location.lat()
        delivery.lng = place.geometry.location.lng()
        // check if address is within 8 miles using the distance function
        if(distance(place.geometry.location.lat(), place.geometry.location.lng()) > 8){
            
            return false
        }
        return true
    }
</script>

<div  class="flex flex-wrap flex-col px-12 space-y-12 py-12 h-full items-center justify-between lg:flex-row lg:space-y-0 lg:space-x-12 lg:flex-grow lg:justify-center">
    <div class="w-full md:w-auto">
        <div class="delivery-card w-full max-w-xs {selected == 'delivery' ? 'selected' : ''}" on:click="{toggleForm}">
            <h3 class="flex items-center md:mb-6 md:pb-6 md:border-b border-dashed border-gold-primary">
                <span class="mr-6">
                    <svg class="h-12 w-12" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.46 77.97"><defs><style>.cls-1,.cls-2{fill:currentColor;}.cls-2{opacity:0.3;}</style></defs><path class="cls-1" d="M97.46,60.91A2.44,2.44,0,0,1,95,63.35H87.71a14.62,14.62,0,1,1-29.23,0H39a14.62,14.62,0,1,1-29.23,0A9.74,9.74,0,0,1,0,53.6V9.75A9.74,9.74,0,0,1,9.75,0H53.6a9.74,9.74,0,0,1,9.75,9.75v4.87h9.94a7.3,7.3,0,0,1,5.55,2.55L89.66,29.79a12.2,12.2,0,0,1,2.93,7.93V58.48H95A2.43,2.43,0,0,1,97.46,60.91ZM87.71,39H63.35v4.88a2.44,2.44,0,0,1-4.87,0V9.75A4.88,4.88,0,0,0,53.6,4.87H9.75A4.87,4.87,0,0,0,4.87,9.75V53.6a4.88,4.88,0,0,0,4.88,4.88h.85a14.59,14.59,0,0,1,27.53,0h21.2a14.59,14.59,0,0,1,27.53,0h.85ZM34.11,63.35a9.75,9.75,0,1,0-9.74,9.75A9.75,9.75,0,0,0,34.11,63.35ZM63.35,34.11h23.4A8.09,8.09,0,0,0,86,33L75.14,20.34a2.43,2.43,0,0,0-1.85-.85H63.35ZM82.84,63.35a9.75,9.75,0,1,0-9.75,9.75A9.76,9.76,0,0,0,82.84,63.35Z"/><path class="cls-2" d="M87.71,39H63.35v4.88a2.44,2.44,0,0,1-4.87,0V9.75A4.88,4.88,0,0,0,53.6,4.87H9.75A4.87,4.87,0,0,0,4.87,9.75V53.6a4.88,4.88,0,0,0,4.88,4.88h.85a14.59,14.59,0,0,1,27.53,0h21.2a14.59,14.59,0,0,1,27.53,0h.85Z"/></svg>
                </span>
                <span class="text-2xl font-medium">
                    Delivery
                </span>
            </h3>
            <p class="font-light hidden md:block">Delivery is free!</p>
            <p class="font-light hidden md:block">We deliver in Monsey and surrounding areas</p>
        </div>
        <div class="md:hidden mt-5">
            <p class="font-light text-xs text-purple-primary">Delivery is free!</p>
            <p class="font-light text-xs text-purple-primary">We deliver in Monsey and surrounding areas</p>
        </div>
    </div>
    <div class="w-full md:w-auto">
        <div class="delivery-card w-full max-w-xs {selected == 'pickup' ? 'selected' : ''}" on:click="{selectPickup}">
            <h3 class="flex items-center md:mb-6 md:pb-6 md:border-b border-dashed border-gold-primary">
                <span class="mr-6">
                    <svg class="h-12 w-12" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.46 77.97"><defs><style>.cls-1,.cls-2{fill:currentColor;}.cls-2{opacity:0.3;}</style></defs><path class="cls-1" d="M46.29,4.87h-39A2.44,2.44,0,0,0,4.87,7.31V70.66a2.44,2.44,0,1,1-4.87,0V7.31A7.31,7.31,0,0,1,7.31,0h39A7.31,7.31,0,0,1,53.6,7.31v9.75a2.44,2.44,0,0,1-4.87,0V7.31A2.44,2.44,0,0,0,46.29,4.87Zm-25.58,11v2.43a2.44,2.44,0,0,1-2.44,2.44H15.84a2.44,2.44,0,0,1-2.44-2.44V15.84a2.44,2.44,0,0,1,2.44-2.44h2.43A2.44,2.44,0,0,1,20.71,15.84Zm0,19.49v2.44a2.43,2.43,0,0,1-2.44,2.43H15.84a2.43,2.43,0,0,1-2.44-2.43V35.33a2.44,2.44,0,0,1,2.44-2.44h2.43A2.44,2.44,0,0,1,20.71,35.33Zm0,19.49v2.44a2.43,2.43,0,0,1-2.44,2.43H15.84a2.43,2.43,0,0,1-2.44-2.43V54.82a2.44,2.44,0,0,1,2.44-2.44h2.43A2.44,2.44,0,0,1,20.71,54.82ZM35.33,20.71a2.44,2.44,0,0,1-2.44-2.44V15.84a2.44,2.44,0,0,1,2.44-2.44h2.44a2.43,2.43,0,0,1,2.43,2.44v2.43a2.43,2.43,0,0,1-2.43,2.44ZM97.46,55.22v8.4a7,7,0,0,1-4.87,6.66v5.25a2.44,2.44,0,1,1-4.88,0V70.66H43.86v4.87a2.44,2.44,0,1,1-4.88,0V70.28a7,7,0,0,1-4.87-6.66v-8.4a11.4,11.4,0,0,1,6.3-10.13l2.5-10.73A9.67,9.67,0,0,1,52.4,26.8H78.75a9.7,9.7,0,0,1,9.5,7.56l2.42,10.49A11.33,11.33,0,0,1,97.46,55.22Zm-4.87,0a6.5,6.5,0,0,0-6.49-6.49H45.48A6.5,6.5,0,0,0,39,55.22v8.4a2.17,2.17,0,0,0,2.17,2.17H90.42a2.17,2.17,0,0,0,2.17-2.17Zm-40.2,2a3.66,3.66,0,1,1-3.66-3.66A3.67,3.67,0,0,1,52.39,57.26ZM45.7,43.86H85.45l-1.94-8.42a4.91,4.91,0,0,0-4.76-3.77H52.4a4.87,4.87,0,0,0-4.75,3.77Zm40.8,13.4a3.66,3.66,0,1,1-3.66-3.66A3.67,3.67,0,0,1,86.5,57.26Z"/><path class="cls-2" d="M92.59,55.22a6.5,6.5,0,0,0-6.49-6.49H45.48A6.5,6.5,0,0,0,39,55.22v8.4a2.17,2.17,0,0,0,2.17,2.17H90.42a2.17,2.17,0,0,0,2.17-2.17Z"/><path class="cls-2" d="M45.7,43.86H85.45l-1.94-8.42a4.91,4.91,0,0,0-4.76-3.77H52.4a4.87,4.87,0,0,0-4.75,3.77Z"/></svg>
                </span>
                <span class="text-2xl font-medium">
                    Curbside pickup
                </span>
            </h3>
            <p class="font-light hidden md:block">Your order will be available for pickup at 51 Main St. Monsey N.Y. 10952</p>
        </div>
        <div class="md:hidden mt-5">
            <p class="font-light text-xs text-purple-primary">Your order will be available for pickup at 51 Main St. Monsey N.Y. 10952</p>
        </div>
    </div>
</div>

<!-- popup -->
{#if openForm}
    <div transition:fade class="fixed px-4 py-4 inset-0 z-infinite flex items-center justify-center background-blur transition duration-150 bg-purple-primary bg-opacity-50 bg-blend-screen" on:click|self="{toggleForm}">
        <div class="rounded-3xl bg-white shadow px-6 pt-8 pb-6 flex flex-col space-y-3 max-w-lg anim-fade relative h-full max-h-popup">
            <div class="overflow-y-auto flex-grow p-3">
                <div class="border-b border-dashed border-gold-primary mb-5 flex items-center pb-5">
                    <h3 class="flex-shrink leading-normal text-left tracking-custom uppercase text-sm text-purple-primary mr-24">enter your delivery info</h3>
                    <button on:click="{toggleForm}" class="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="transition-all rounded-full w-8 h-8 hover:bg-gold-light text-gold-primary p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div on:submit|preventDefault={selectDelivery} bind:this={form} class="flex-grow flex flex-col justify-between space-y-4">
                    <div class="">
                        <input required bind:value="{delivery.firstName}" class="bg-gray-100 rounded {!errors.firstName ? 'border-gray-300 focus:ring focus:ring-purple-primary' : 'border-red-500 focus:ring focus:ring-red-500'} focus:outline-none focus:border-none transition duration-150 tracking-wide w-8/12" placeholder="First name" type="text">
                        {#if errors.firstName}
                            <p class="text-purple-primary mt-3">{errors.firstName}</p>
                        {/if}
                    </div>
                    <div class="">
                        <input required bind:value="{delivery.lastName}" class="bg-gray-100 rounded {!errors.lastName ? 'border-gray-300 focus:ring focus:ring-purple-primary' : 'border-red-500 focus:ring focus:ring-red-500'} focus:outline-none focus:border-none transition duration-150 tracking-wide" placeholder="Last name" type="text">
                        {#if errors.lastName}
                            <p class="text-purple-primary mt-3">{errors.lastName}</p>
                        {/if}
                    </div>
                    <div class="">
                        <input required bind:value="{delivery.phone}" class="bg-gray-100 rounded {!errors.phone ? 'border-gray-300 focus:ring focus:ring-purple-primary' : 'border-red-500 focus:ring focus:ring-red-500'} focus:outline-none focus:border-none transition duration-150 tracking-wide w-8/12" placeholder="Phone number" type="text">
                        {#if errors.phone}
                            <p class="text-purple-primary mt-3">{errors.phone}</p>
                        {/if}
                    </div>
                    <div class="">
                        <input autocomplete="nope" name="randomName" id="addressInputContainer" required value="{delivery.address}" class="bg-gray-100 rounded {!errors.address ? 'border-gray-300 focus:ring focus:ring-purple-primary' : 'border-red-500 focus:ring focus:ring-red-500'} focus:outline-none focus:border-none transition duration-150 tracking-wide w-10/12" placeholder="Delivery Address" type="text">
                        {#if errors.address}
                            <p class="text-purple-primary mt-3">{errors.address}</p>
                        {/if}
                    </div>
                    <div class="">
                        <input required bind:value="{delivery.email}" class="bg-gray-100 rounded {!errors.email ? 'border-gray-300 focus:ring focus:ring-purple-primary' : 'border-red-500 focus:ring focus:ring-red-500'} focus:outline-none focus:border-none transition duration-150 tracking-wide w-7/12" placeholder="Email" type="email">
                        {#if errors.email}
                            <p class="text-purple-primary mt-3">{errors.email}</p>
                        {/if}
                    </div>
                    <div class="flex items-center space-x-4">
                        <input class="text-purple-primary rounded focus:outline-none focus:ring-0 w-5 h-5" type="checkbox" id="gift" name="gift" bind:checked="{delivery.gift}">
                        <label class="uppercase text-purple-primary" for="gift">Is this a gift?</label>
                    </div>
                
                    <div class="">
                        <input disabled="{!delivery.gift}" bind:value="{delivery.giftTo}" class="bg-gray-100 rounded {!errors.giftFrom ? 'border-gray-300 focus:ring focus:ring-purple-primary' : 'border-red-500 focus:ring focus:ring-red-500'} focus:outline-none focus:border-none transition duration-150 tracking-wide w-8/12 {delivery.gift ? '' : 'opacity-50' }" placeholder="To" type="text">
                        {#if errors.giftTo}
                            <p class="text-purple-primary mt-3">{errors.giftTo}</p>
                        {/if}
                    </div>
                    <div class="">
                        <input disabled="{!delivery.gift}" bind:value="{delivery.giftMessage}" class="bg-gray-100 rounded {!errors.giftMessage ? 'border-gray-300 focus:ring focus:ring-purple-primary' : 'border-red-500 focus:ring focus:ring-red-500'} focus:outline-none focus:border-none transition duration-150 tracking-wide {delivery.gift ? '' : 'opacity-50' }" placeholder="Message" type="text">
                        {#if errors.giftMessage}
                            <p class="text-purple-primary mt-3">{errors.giftMessage}</p>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-end space-x-5">
                <button class="rounded-lg py-4 px-6 bg-gold-primary text-purple-primary hover:bg-gold-dark tracking-widest uppercase transition duration-150 focus:outline-none" on:click="{toggleForm}">Go back</button>
                <button class="bg-purple-primary rounded-lg text-center cursor-pointer text-white py-4 tracking-widest flex-grow hover:text-purple-light transition duration-150" id="delivery-btn" type="submit" on:click|preventDefault="{selectDelivery}">CONTINUE</button>
            </div>
        </div>
    </div>
{/if}

<style global>
    .pac-container{
        z-index: 999999999 !important;
        border-radius: 1rem;
        padding:0.5rem;
    }

    .pac-item{
        padding:0.6rem 1rem !important;
        margin:0 0 1rem 0 !important;
        border-radius: 0.6rem;
        border: none !important;
    }

    .pac-item-query{
        display: block !important;
        font-size: 14px !important;
        letter-spacing: 0.1em !important;

    }
    .pac-item,
    .pac-item-query,
    .pac-item-query .pac-matched{
        color: #662874 !important;
    }

    .pac-item:hover *,
    .pac-item:hover,
    .pac-item-selected *,
    .pac-item-selected,
    .pac-item-selected span .pac-matched,
    .pac-item-selected .pac-item-query .pac-matched{
        background-color: #662874 !important;
        color: white !important;
    }
    .pac-item .pac-icon{
        display: none !important;
    }
</style>