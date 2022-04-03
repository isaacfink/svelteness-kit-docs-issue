<script>
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import SwiperCore, { Navigation } from 'swiper';
	import 'swiper/css';
	import "swiper/css/navigation"
	import MediaQuery from '$lib/components/mediaQuery.svelte';
    import PackageOverlay from '$lib/components/order/packageOverlay.svelte'
    import PackageOverlayMobile from '$lib/components/order/packageOverlayMobile.svelte'
	import {cart} from '$lib/stores/store';
	import { onDestroy } from 'svelte';

	export let p;

	let popup = false;
	$: isInCart = $cart.packages.some(pkg => p.id == pkg.id)
	$: amountInCart = isInCart && $cart.packages.find(pkg => p.id == pkg.id).amount || 1

	function togglePopup() {
		popup = !popup;
	}

	SwiperCore.use([Navigation]);

	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

</script>

<div
	class="rounded-3xl relative p-4 shadow-xl cursor-pointer mx-6 my-6 max-w-pkg md:w-80 hover:transform md:hover:scale-105 transition duration-200 ease-linear hover:shadow-2xl flex flex-col group"
>
{#if isInCart}
	
<div
	class="absolute bg-purple-primary p-3 -top-4 -left-4 md:-left-6 z-20 rounded flex items-center justify-around"
>
	<p class="text-white mr-3">{amountInCart}</p>
	<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.53 7.59">
		<g id="Layer_2" data-name="Layer 2">
			<g id="Layer_1-2" data-name="Layer 1">
				<path
					d="M8.52,1.53,7.74,4.24a.69.69,0,0,1-.68.5H2.45l.11.48H7.35a.23.23,0,0,1,.24.23.24.24,0,0,1-.24.24h-5a.24.24,0,0,1-.23-.19L1,.47H.24A.23.23,0,0,1,0,.24.24.24,0,0,1,.24,0h1a.25.25,0,0,1,.23.18L1.59,1H8.06a.47.47,0,0,1,.38.19A.42.42,0,0,1,8.52,1.53ZM8.06,1.4l-6.36,0,.65,2.85H7.06a.24.24,0,0,0,.23-.16ZM3.56,6.76a.83.83,0,0,1-1.66,0,.83.83,0,0,1,1.66,0Zm-.48,0a.36.36,0,1,0-.35.35A.36.36,0,0,0,3.08,6.76Zm4.51,0a.83.83,0,0,1-1.66,0,.83.83,0,0,1,1.66,0Zm-.48,0a.36.36,0,1,0-.35.35A.36.36,0,0,0,7.11,6.76Z"
					style="fill:#fff"/>
					<path
					d="M8.06,1.4l-6.36,0,.65,2.85H7.06a.24.24,0,0,0,.23-.16Z"
					style="fill:#fff;opacity:0.31"/>
					</g>
					</g
		></svg
	>
</div>
{/if}
	<Swiper
		loop="{true}"
		navigation="{true}"
		class="overflow-hidden rounded-xl w-full h-72 relative justify-center items-center object-cover"
	>
		<SwiperSlide>
			<img
				src="https://picsum.photos/200/200"
				alt=""
				class="h-80 border border-gray-100 w-full object-cover rounded-xl group-hover:rotate-0 group-hover:transform"
			/>
		</SwiperSlide>
		<!-- {#each p.pkgImages as img}
			<SwiperSlide>
				<img
					class="h-80 border border-gray-100 w-full object-cover rounded-xl"
					src="{img.image}"
					alt="product"
				/>
			</SwiperSlide>
		{/each} -->
	</Swiper>
	<div class="px-2 py-4 flex flex-col flex-grow">
		<div
			class="flex items-center justify-between pb-4 border-b border-dashed border-gold-primary flex-grow"
		>
			<p class="text-3xl text-purple-primary font-normal capitalize mr-4">{p.name}</p>
			<!-- <p class="text-3xl text-gold-primary block">{formatter.format(p.price)}+</p> -->
		</div>
		<p class="my-4 text-gold-primary uppercase tracking-widest font-light">{p.description}</p>
		<button
			on:click={togglePopup}
			class="mt-auto bg-purple-primary w-full text-white rounded-lg py-2 tracking-widest uppercase hover:text-opacity-50 transition transition-150"
			>Customize</button
		>
	</div>
</div>

{#if popup}

	<MediaQuery query="(min-width: 768px)" let:matches>
		{#if matches}
			<PackageOverlay 
				p={p} 
                on:close={togglePopup}
			/>
		{/if}
	</MediaQuery>

	<MediaQuery query="(max-width: 767px)" let:matches>
		{#if matches}
			<PackageOverlayMobile 
				p={p} 
				on:close={togglePopup}
			/>
		{/if}
	</MediaQuery>

{/if}

<style global>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
        -webkit-text-fill-color: #662874;
	}
	.swiper-button-next,
	.swiper-button-prev{
		color:white;
        --swiper-navigation-size: 25px;
	}

	.block{
		display:block;
	}
</style>


