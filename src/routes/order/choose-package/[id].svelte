<script context="module">
    export function load({params}){
        const {id} = params;
        return {props:{id:parseInt(id)}}
    }
  </script>

<script>
    import {operationStore, query} from '@urql/svelte'
    import {orderNavigationData as ond} from '$lib/stores/store'
    import {CATEGORY} from '$lib/queries/common'
    import {onMount} from 'svelte'
    import Package from '$lib/components/order/package.svelte'
    import {cart} from '$lib/stores/store'

    export let id
    let LottiePlayer

    let category = operationStore(CATEGORY, { id })

    query(category)

    onMount(async () => {
        const module = await import('@lottiefiles/svelte-lottie-player');
        LottiePlayer = module.LottiePlayer;
        cart.update((current) => {
            current.category = {
                id: id,
                type: category.data?.category?.type,
            }
            console.log(current);
            return current
        })
        ond.update(() => {
            return {
                tag: `Choose your ${$category?.data?.category?.name}`,
                headerTitle: 'Choose your meal',
                title: `Choose your ${$category?.data?.category?.name}`,
                mainText: $category?.data?.category?.sideBarText,
                next: undefined,
                continue:false,
                showCart:true
            }
        })
    })

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
</script>

<div class="overflow-y-auto w-full md:mt-12 pb-12 custom-scroll mr-1">
      <div class="grid grid-cols-1 md:grid-cols-2 huge:grid-cols-3 gap-2 md:gap-10 md:w-max mx-auto pb-28">
        {#if $category.fetching}
        {   #if LottiePlayer}
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
        {:else if $category.errors}
            <p>{$category.errors.message}</p>
        {:else} 
            {#if $category.data?.category?.type == 'A_2'}
                <p class="rounded-lg bg-gold-primary bg-opacity-30 text-gold-primary mx-auto md:col-span-2 huge:col-span-3 py-1 px-3 mt-5 md:mt-0">
                    {$category.data.category.name} minimum order price: {formatter.format($category.data.category.minimumPrice)}
                </p>
            {/if}
            {#each $category.data.category.packageSet as pkg}
                <Package 
                  p="{pkg}" />
            {/each}
        {/if}
      </div>
  </div>