<script>
	import '../app.css';
	import { initClient } from '@urql/svelte';
	import {fly} from 'svelte/transition'
	import {onMount} from 'svelte';
	import {page} from '$app/stores'

    let currentPage = $page
	let navOpen = false

	function toggleNav() {
		navOpen = !navOpen
	}

	onMount(() => {
		localStorage.removeItem('order')
		currentPage = $page
		if (window.matchMedia('@media screen and (min-width:768px) and (max-width: 1930px)')) {
			// change html font size
			document.querySelector('html').style.fontSize = '14px'
		}
	})

	const GRAPHQL_ENDPOINT = 'http://127.0.0.1:8000/api/'

    const client = initClient({
      url: GRAPHQL_ENDPOINT,
      fetchOptions: () => {
        return {
          method:'POST',
        }
      }
    });
</script>


<svelte:head>
	<slot name="head"></slot>
	<meta name="theme-color" content="rgb(102 40 116)">
	<!-- add favicon -->
	<link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
</svelte:head>

<div class="flex flex-col h-screen">
	<header class="w-screen bg-purple-primary py-8 px-8  sticky top-0">
		<div class="flex items-center justify-between space-x-8">
			<button class="md:hidden focus:outline-none" on:click="{toggleNav}">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<a href="/">
				<img class="w-48 hover:opacity-90 transition-opacity duration-75" src="/images/Logo.svg" alt="logo">
			</a>
			<div class="md:hidden h-12 w-12"></div>
			<div class="hidden md:block">
				<nav class="flex space-x-8 items-center">
					<a class="{$page.url.pathname == '/' ? 'active-link' : 'link'}" href="/">Home</a>
					<a class="{$page.url.pathname == '/about' ? 'active-link' : 'link'}" href="/about">About</a>
					<a class="{$page.url.pathname == '/faq' ? 'active-link' : 'link'}" href="/faq">FAQ</a>
					<a class="tracking-widest lg:text-xl hidden lg:inline-block py-2 px-5 rounded-lg shadow bg-gold-primary text-purple-primary uppercase hover:bg-gold-dark hover:shadow transition duration-150" href="/order/start-order">Order now</a>
				</nav>
			</div>
		</div>
		{#if navOpen}
			<nav transition:fly class="fixed inset-0 filter background-blur ml-0">
				<div class="w-1/2 h-full bg-purple-primary flex flex-col justify-between items-start pl-8 py-10 pr-12 space-y-8">
					<button class="text-gold-primary focus:outline-none" on:click="{toggleNav}">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					<div class="flex flex-col space-y-8">
						<a class="active uppercase text-white text-xl" href="/">Home</a>
						<a class="uppercase text-white text-xl" href="/about">About</a>
						<a class="uppercase text-white text-xl" href="/faq">FAQ</a>
					</div>
					<div class="border-r border-gold-primary border-dashed flex-grow w-5"></div>
					<img alt="gold icon" src="/images/IconGold.svg">
				</div>
			</nav>
		{/if}
	</header>
	<slot />
</div>



<style global>
	@font-face {
	font-family: 'bn_bergen_stblack';
	src: url('/fonts/BnbergenstBlackWebfont.woff') format('woff2'),
		 url('/fonts/BnbergenstBlackWebfont.woff2') format('woff');
	font-weight: normal;
	font-style: normal;
  
	}
	@font-face {
	  font-family: 'bn_bergen_stbold';
	  src: url('/fonts/BnbergenstBoldWebfont.woff') format('woff2'),
		  url('/fonts/BnbergenstBoldWebfont.woff2') format('woff');
	  font-weight: normal;
	  font-style: normal;
  
	}
	@font-face {
	  font-family: 'bn_bergen_stlight';
	  src: url('/fonts/BnbergenstLightWebfont.woff') format('woff2'),
		  url('/fonts/BnbergenstLightWebfont.woff2') format('woff');
	  font-weight: normal;
	  font-style: normal;
  
	}
	@font-face {
	  font-family: 'bn_bergen_stmedium';
	  src: url('/fonts/BnbergenstMediumWebfont.woff') format('woff2'),
		  url('/fonts/BnbergenstMediumWebfont.woff2') format('woff');
	  font-weight: normal;
	  font-style: normal;
  
	}
	@font-face {
	  font-family: 'bn_bergen_stregular';
	  src: url('/fonts/BnbergenstWebfont.woff') format('woff2'),
		  url('/fonts/BnbergenstWebfont.woff2') format('woff');
	  font-weight: normal;
	  font-style: normal;
  
	}
	*,
	*::before,
	*::after{
	  font-family: 'bn_bergen_stmedium';
	}
  </style>
