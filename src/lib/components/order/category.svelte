<script>
        import { goto } from '$app/navigation';
        import {cart} from '$lib/stores/store'
    
        import {createEventDispatcher} from 'svelte'
        export let category;
    
        const dispatch = createEventDispatcher()
    
        function handleLink() {
            let data = JSON.parse(localStorage.getItem('order'))
            if ($cart.category?.id != category.id && $cart.packages.length > 0) {
                dispatch('clicked',{
                    id:category.id,
                    type:category.type,
                })
            }else{
                goto(`/order/choose-package/${category.id}`)
            }
        }
    </script>
    
    <a href="/order/choose-package/{category.id}" on:click|preventDefault={handleLink} class="rounded-3xl p-4 shadow-xl cursor-pointer mx-6 my-6 max-w-xs hover:transform md:hover:scale-105 transition duration-200 ease-linear hover:shadow-2xl">
        <div class="overflow-hidden rounded-xl w-full h-52 relative px-8 flex flex-col justify-start ">
            <img src="{category.image}" alt="{category.name}" class="absolute inset-x-0 w-full z-10 h-full rounded-xl">
            <p class="text-smallest z-20 text-white uppercase mt-5">for earliest delivery</p>
            <p class="text-smallest z-20 leading-loose px-2 bg-green-primary text-white inline-block w-max uppercase tracking-wider rounded">Order by: {category.schedule?.orderBy}</p>
        </div>
        <div class="px-2 py-4">
            <div class="flex items-center space-x-20 justify-between pb-4 border-b border-dashed border-gold-primary">
                <p class="text-3xl capitalize text-purple-primary">{category.name}</p>
                <div class="h-7">
    
                    <img class="h-full" src="{category.icon}" alt="category icon">
                </div>
            </div>
            <p class="mt-4 text-purple-primary uppercase text-sm tracking-widest">{category.description}</p>
        </div>
    </a>
    