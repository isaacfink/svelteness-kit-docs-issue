<script>
    import { sequelPayConfigure } from "$lib/utilties/sequelPay";
    import { onMount } from "svelte";
    import {orderNavigationData as ond} from '$lib/stores/store'

    function handleSubmit(){
        return
    }

    onMount(() => {
        
        ond.update(() => {
            return {
                tag:'Checkout',
                headerTitle: 'Checkout',
                title: 'Payment and checkout',
                mainText: 'Complete your order and checkout',
                next: undefined,
                continue:false,
                showCart:true
            }
        })

        start()

        // if (CollectJS) {
        //     sequelPayConfigure(handleSubmit)
        // }else{
        //     console.log("CollectJS is not loaded")
        // }
    })

    function start(){
        sequelPayConfigure(handleSubmit)
    }

    function submitOrder(){
        return
    }

    function changeName(e){
        console.log(e)
    }

    function changeDelivery(){
        return
    }

    function changeAddress(){
        return
    }

    function changeEmail(){
        return
    }

    let formErrors = {}
    let gift = true
    
</script>

<svelte:head>
    <script src="https://gateway.sequelpay.com/js/Collect/Collect.js"></script>
    <title>Checkout</title>
</svelte:head>

<button on:click={start}>init</button>

<main class="container mx-auto gap-24 py-12 overflow-y-auto md:items-center">
    <div class="max-w-full md:max-w-4xl mx-auto">
        <form action="" on:submit|preventDefault={submitOrder}>
            <div class="p-5 bg-white shadow-xl rounded-2xl md:w-full mx-5 w-11/12">
                <div class="flex border-b border-dashed border-gold-primary py-5 justify-between items-end">
                    <p class="tracking-custom uppercase text-sm text-purple-primary">delivery</p>
                </div>
                <div class="flex items-center justify-between my-5">
                    <h3 class="font-normal text-3xl text-purple-primary">Delivery</h3>
                    <p on:click="{changeDelivery}" class="cursor-pointer bg-gray-100 py-2 px-3 text-center border-gray-100 tracking-widest uppercase text-sm md:text-base rounded-lg text-purple-primary">change to pickup</p>
                </div>
                <div class="flex items-center flex-wrap justify-between md:space-x-5 mb-5">
                    <p class="font-normal text-xl capitalize text-purple-primary mb-3 md:mb-0">{gift ? 'recipient' : 'your name'}</p>
                    <div class="border-b border-dashed border-gold-primary flex-grow hidden md:block"></div>
                    <input on:change={(e) => changeName(e)} value="" required placeholder="enter your name" class="text-opacity-60 w-full md:w-56 rounded-lg py-3 px-4 border-2 bg-gray-50 focus:outline-none focus:border-2">
                </div>

                <div class="flex items-center flex-wrap justify-between md:space-x-5 mb-5">
                    <p class="font-normal text-xl capitalize text-purple-primary mb-3 md:mb-0">email</p>
                    <div class="border-b border-dashed border-gold-primary flex-grow hidden md:block"></div>
                    <input on:change={(e) => changeEmail(e)} value="" required placeholder="enter your email" class="text-opacity-60 w-full md:w-56 rounded-lg py-3 px-4 border-2 bg-gray-50 focus:outline-none focus:border-2 ">
                </div>
                <div class="flex md:items-center md:space-x-5 mt-5 flex-col md:flex-row">
                    <div class="flex items-center space-x-4 mb-5 md:mb-0">
                        <input class="text-purple-primary rounded focus:outline-none focus:ring-0 w-5 h-5" type="checkbox" id="gift" name="gift" bind:checked={gift}>
                        <label class="uppercase text-purple-primary" for="gift">Is this a gift?</label>
                    </div>
                    <input disabled="{!gift}" class="text-opacity-60 rounded-lg py-3 px-4 bg-gray-50 border-gray-200 mb-5 md:mb-0 border-2 outline-none focus:border-2 focus:border-purple-primary focus:outline-none" type="text" placeholder="To" value="">
                    <input disabled="{!gift}" class="text-opacity-60 rounded-lg py-3 px-4 flex-grow bg-gray-50 border-gray-200 border-2 outline-none focus:border-2 focus:border-purple-primary" type="text" placeholder="Message" value="">
                </div>
            </div>
            <div class="p-5 bg-white shadow-xl mt-5 rounded-2xl md:w-full mx-5 w-11/12">
                <div class="flex border-b border-dashed border-gold-primary py-5 justify-between items-end">
                    <p class="tracking-custom uppercase text-sm text-purple-primary">payment</p>
                </div>

                <div class="md:grid md:grid-cols-8 md:gap-4 justify-between mt-4">
                    <div class="mb-4 col-span-4">
                        <div id="creditCardNumber"></div>
                        <!-- <input autocomplete="cc-number" id="careditCardNumber" required class="text-lg bg-gray-50 outline-none border-2 flex-grow {!formErrors.cardNumber ? 'focus:border-purple-primary border-gray-200' : 'focus:border-red-500 border-red-500'} mr-4 rounded m-0 w-full" type="text" placeholder="Card number"> -->
                        {#if formErrors.cardNumber}
                            <p class="text-purple-primary text-left w-full">{formErrors.cardNumber}</p>
                        {/if}
                    </div>
                    <div class="flex mb-4 col-span-4">
                        <div class="">
                            <div id="creditCardExpiryDate"></div>
                            <!-- <input autocomplete="cc-exp" id="ccexp" required placeholder="Exp" class="md:flex-1 text-lg bg-gray-50 outline-none border-2 {!formErrors.exp ? 'focus:border-purple-primary border-gray-200' : 'focus:border-red-500 border-red-500'} flex-shrink rounded m-0 w-full" type="text"> -->
                            {#if formErrors.exp}
                                <p class="text-purple-primary text-left w-full">{formErrors.exp}</p>
                            {/if}
                        </div>
                        <div class="">
                            <div id="creditCardCvv" class="md:flex-1 ml-4 flex-grow"></div>
                            <!-- <input autocomplete="cc-csc" required placeholder="CVV" min="111" max="9999" class="md:flex-1 text-lg bg-gray-50 outline-none border-2 {!formErrors.cvv ? 'focus:border-purple-primary border-gray-200' : 'focus:border-red-500 border-red-500'} ml-4 flex-grow rounded m-0" type="text"> -->
                            {#if formErrors.cvv}
                                <p class="text-purple-primary text-left w-full">{formErrors.cvv}</p>
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="md:grid md:grid-cols-8 md:gap-4 justify-between">
                    <div class="mb-4 col-span-3">
                        <div id="creditCardName"></div>
                        <!-- <input autocomplete="cc-name" required class="md:flex-1 text-lg bg-gray-50 outline-none border-2 {!formErrors.nameOnCard ? 'focus:border-purple-primary border-gray-200' : 'focus:border-red-500 border-red-500'} mr-4 flex-grow rounded m-0 w-full" type="text" placeholder="Name on card"> -->
                        {#if formErrors.nameOnCard}
                            <p class="text-purple-primary text-left w-full">{formErrors.nameOnCard}</p>
                        {/if}
                    </div>
                    <div class="flex mb-4 col-span-5 md:grid grid-cols-4 md:gap-4">
                        <div class="col-span-3">
                            <input autocomplete="street-address" required class="md:flex-1 text-lg bg-gray-50 outline-none border-2 {!formErrors.cardAddress ? 'focus:border-purple-primary border-gray-200' : 'focus:border-red-500 border-red-500'} mr-4 flex-grow rounded-lg m-0 w-full" placeholder="Billing address" type="text">
                            {#if formErrors.cardAddress}
                                <p class="text-purple-primary text-left w-full">{formErrors.cardAddress}</p>
                            {/if}
                        </div>
                        <div class="col-span-1 ml-4 md:ml-0">
                            <input autocomplete="postal-code" required placeholder="Zip" min="111" max="9999" class="md:flex-1 text-lg bg-gray-50 outline-none border-2 {!formErrors.cardZipCode ? 'focus:border-purple-primary border-gray-200' : 'focus:border-red-500 border-red-500'} flex-shrink rounded-lg m-0 w-full" type="text">
                            {#if formErrors.cardZipCode}
                                <p class="text-purple-primary text-left w-full">{formErrors.cardZipCode}</p>
                            {/if}
                        </div>
                    </div>
                </div>
                <div class="md:flex items-center justify-between relative">
                    <input placeholder="Coupon" class="text-lg bg-gray-50 border-gray-200 outline-none focus:border-2 focus:border-purple-primary rounded-lg w-full md:w-1/2 mb-4 md:mb-0" type="text">
                    <button on:click|preventDefault="{submitOrder}" class="text-white bg-purple-primary py-3 px-5 rounded-lg text-xl tracking-widest uppercase">place order</button>
                </div>
                <p class="text-purple-primary mt-3">There was an error with yourpayment please try again later or reach out to us</p>
            </div>
        </form>
    </div>
</main>
