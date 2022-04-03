<script>
    import { operationStore, query } from '@urql/svelte';
    import {ALL_CATEGORIES} from '$lib/queries/common'
    import {cart, orderNavigationData as ond} from '$lib/stores/store'
    import {onMount} from 'svelte'
    import {fade} from 'svelte/transition'
    import Category from '$lib/components/order/category.svelte'
    import {goto} from '$app/navigation'

    let categories = operationStore(ALL_CATEGORIES)

    query(categories)

    onMount(() => {
        ond.update(() => {
            return {
                tag:'Select a package',
                headerTitle: 'Choose package',
                title: 'Choose a package',
                mainText: 'What would you like to order?',
                next: undefined,
                continue:false
            }
        })
    })

    let LottiePlayer

	onMount(async () => {
		const module = await import('@lottiefiles/svelte-lottie-player');
		LottiePlayer = module.LottiePlayer;
	});

    let popup = false
    let link

    function handleClicked(e){
		link = e.detail.id,
		popup = true
	}

    function deletePackages(){
		cart.update(current => {
            current.packages = []
            return current
        })
		goto(`/order/choose-package/${link}`)
	}

</script>

<div class="overflow-y-auto w-full md:mt-12 pb-12 custom-scroll mr-1">
    <div class="grid grid-cols-1 md:grid-cols-2 huge:grid-cols-3 gap-2 md:gap-10 w-max mx-auto pb-28">
        <div class="hidden lg:block w-full shadow-2xl z-20 col-span-2 huge:col-span-3"></div>
      {#if $categories.fetching}
        {#if LottiePlayer}
            <div class="flex items-center justify-center md:col-span-2 huge:col-span-3">
                <LottiePlayer
                    src={'/animations/loading.json'}
                    autoplay={true}
                    loop={true}
                    controls={false}
                    renderer='svg'
                    background='transparent'
                    height={500}
                    width={500}
                />
            </div>
        {/if}
      {:else if $categories.errors}
        <p>{$categories.errors.message}</p>
      {:else}
        {#each $categories.data.categories as category}
            <Category {category} on:clicked={handleClicked}/>
        {/each}
      {/if}
  </div>
</div>    
{#if popup}
  <div
      transition:fade|local
      class="fixed inset-0 flex items-center justify-center background-blur z-infinite bg-purple-primary bg-opacity-50 filter backdrop-filter backdrop-blur-sm"
  >
      <div class="bg-white p-5 rounded-xl max-w-xs">
          <h2 class="text-2xl text-purple-primary mb-5 text-center">Delete previous order?</h2>
          <p class="text-purple-primary text-center text-xl pb-5 border-b mb-5 border-gold-primary border-dashed">You already have items in your cart. Clicking continue will clear your cart.</p>
          
          <div class="flex flex-col">
              <button on:click="{() => popup = false}" class="border-purple-primary rounded-lg border-2 mb-5 text-purple-primary p-4 tracking-widest hover:border-purple-light hover:text-purple-light transition duration-150 uppercase w-full md:w-auto mt-4 md:mt-0">Close</button>
              <a href="/order/choose-package/{link}" on:click|preventDefault="{deletePackages}" class="border-purple-primary rounded-lg border-2 text-center text-white p-4 tracking-widest  hover:text-purple-light bg-purple-primary transition duration-150 uppercase w-full md:w-auto mt-4 md:mt-0">Continue</a>
          </div>
      </div>
  </div>
{/if}