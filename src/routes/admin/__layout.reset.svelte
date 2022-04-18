<script>
	// svelte imports
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// urql imports
	import { initClient } from '@urql/svelte';
	import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
	import { errorExchange } from '@urql/core';

	// stores imports
	import { auth } from '$lib/stores/auth';

	// third party imports

	// mobile menu
	let mobileMenuOpen = false;

	function toggleMobileMenuOpen() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// urql client
	const GRAPHQL_ENDPOINT = 'http://127.0.0.1:8000/api/';

	const client = initClient({
		url: GRAPHQL_ENDPOINT,
		fetchOptions: () => {
			const token = $auth.token
			return {
				headers: { authorization: token ? `JWT ${token}` : '' }
			}
		},
		exchanges: [
			multipartFetchExchange,
			errorExchange({
				onError: (error) => {
					if (JSON.stringify(error).includes('Unauthenticated')) {
						goto(`/accounts/login?next=${$page.url.pathname}`)
					}
				},
			}),
			// authExchange({
			// 	willAuthError: ({ authState }) => {
			// 		// check if auth expires is in the past
			// 		if ($auth.expires < new Date()) {
			// 			return true;
			// 		}
			// 	},
			// 	didAuthError: ({ error }) => {
			// 		// check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
			// 		console.log(error)
			// 		return error.graphQLErrors.some(
			// 			e => e.extensions?.code === 'FORBIDDEN',
			// 		);
			// 	},
			// 	getAuth: async ({ authState, mutate }) => {
			// 	// for initial launch, fetch the auth state from storage (local storage, async storage etc)
			// 		if (!authState) {
			// 			const token = $auth.token;
			// 			const refreshToken = $auth.refreshToken;
			// 			if (token && refreshToken) {
			// 				console.log("Token and refreshToken returned");
			// 			}
			// 			return null;
			// 		}
			// 		goto(`/accounts/login?next${$page.url.pathName}`)
			// 		return null
			// 	}
			// })
		]
	});

	onMount(() => {
		if (!$auth.token || $auth.expires < new Date()) {
			console.log($page);
			goto(`/accounts/login?next=${$page.url.pathname}`);
		}
	});

	function logout(){
		auth.update(
			auth => {
				auth.token = null;
				auth.refreshToken = null;
				auth.expires = null;
				auth.isAuthenticated = false;
				return auth;
			}
		)
		goto(`/accounts/login?next=${$page.url.pathname}`);
	}
</script>

<div class="h-screen flex">
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	{#if mobileMenuOpen}
		<div class="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
			<!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.
  
        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
			<div
				class="fixed inset-0 bg-gray-600 bg-opacity-75"
				on:click|self={toggleMobileMenuOpen}
				aria-hidden="true"
			/>

			<!--
        Off-canvas menu, show/hide based on off-canvas menu state.
  
        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
			<div class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
				<!--
          Close button, show/hide based on off-canvas menu state.
  
          Entering: "ease-in-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
				<div class="absolute top-0 right-0 -mr-12 pt-2">
					<button
						type="button"
						on:click={toggleMobileMenuOpen}
						class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span class="sr-only">Close sidebar</span>
						<!-- Heroicon name: outline/x -->
						<svg
							class="h-6 w-6 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
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

				<div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
					<div class="flex-shrink-0 flex items-center px-4">
						<img
							class="h-8 w-auto"
							src="https://tailwindui.com/img/logos/workflow-logo-purple-primary-mark-gray-900-text.svg"
							alt="Workflow"
						/>
					</div>
					<nav aria-label="Sidebar" class="mt-5">
						<div class="px-2 space-y-1">
							<!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
							<a
								href="/admin/categories"
								class="{$page.url.pathname == '/admin/categories'
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-base font-medium rounded-md"
							>
								<!-- Heroicon name: outline/home -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 10h16M4 14h16M4 18h16"
									/>
								</svg>
								Categories
							</a>

							<a
								href="/admin/packages"
								class="{$page.url.pathname == '/admin/packages'
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-base font-medium rounded-md"
							>
								<!-- Heroicon name: outline/calendar -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
									/>
								</svg>
								Packages
							</a>

							<a
								href="/admin/products"
								class="{$page.url.pathname == '/admin/products'
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-base font-medium rounded-md"
							>
								<!-- Heroicon name: outline/user-group -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentcolor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path
										d="M17.536 3.393c3.905 3.906 3.905 10.237 0 14.143c-3.906 3.905 -10.237 3.905 -14.143 0l14.143 -14.143"
									/>
									<path d="M5.868 15.06a6.5 6.5 0 0 0 9.193 -9.192" />
									<path d="M10.464 10.464l4.597 4.597" />
									<path d="M10.464 10.464v6.364" />
									<path d="M10.464 10.464h6.364" />
								</svg>
								Products
							</a>

							<a
								href="/admin/schedules"
								class="{$page.url.pathname == '/admin/schedules'
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-base font-medium rounded-md"
							>
								<!-- Heroicon name: outline/search-circle -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								Schedules
							</a>

							<a
								href="/admin/orders"
								class="{$page.url.pathname == '/admin/orders'
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-base font-medium rounded-md"
							>
								<!-- Heroicon name: outline/speakerphone -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								Orders
							</a>
						</div>
					</nav>
				</div>
				<div class="flex-shrink-0 flex border-t border-gray-200 p-4" />
			</div>

			<div class="flex-shrink-0 w-14" aria-hidden="true">
				<!-- Force sidebar to shrink to fit close icon -->
			</div>
		</div>
	{/if}

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:flex lg:flex-shrink-0">
		<div class="flex flex-col w-64">
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
				<div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
					<div class="flex items-center flex-shrink-0 px-4">
						<img class="h-12 w-auto mx-auto" src="/images/Logo.svg" alt="Workflow" />
					</div>
					<nav class="mt-5 flex-1" aria-label="Sidebar">
						<div class="px-2 space-y-1">
							<!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
							<a
								href="/admin/categories"
								class="{$page.url.pathname.startsWith('/admin/categories')
									? 'bg-gray-200 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md"
							>
								<!--
                    Heroicon name: outline/home
  
                    Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500"
                  -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 10h16M4 14h16M4 18h16"
									/>
								</svg>
								Categories
							</a>

							<a
								href="/admin/packages"
								class="{$page.url.pathname.startsWith('/admin/packages')
									? 'bg-gray-200 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md"
							>
								<!-- Heroicon name: outline/calendar -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
									/>
								</svg>
								Packages
							</a>

							<a
								href="/admin/products"
								class="{$page.url.pathname.startsWith('/admin/products')
									? 'bg-gray-200 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md"
							>
								<!-- Heroicon name: outline/user-group -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentcolor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path
										d="M17.536 3.393c3.905 3.906 3.905 10.237 0 14.143c-3.906 3.905 -10.237 3.905 -14.143 0l14.143 -14.143"
									/>
									<path d="M5.868 15.06a6.5 6.5 0 0 0 9.193 -9.192" />
									<path d="M10.464 10.464l4.597 4.597" />
									<path d="M10.464 10.464v6.364" />
									<path d="M10.464 10.464h6.364" />
								</svg>
								Products
							</a>

							<a
								href="/admin/schedules"
								class="{$page.url.pathname == '/admin/schedules'
									? 'bg-gray-200 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md"
							>
								<!-- Heroicon name: outline/search-circle -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								Schedules
							</a>

							<a
								href="/admin/orders"
								class="{$page.url.pathname == '/admin/orders'
									? 'bg-gray-200 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md"
							>
								<!-- Heroicon name: outline/speakerphone -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								Orders
							</a>
						</div>
					</nav>
				</div>
				<div class="p-2">
					<button
					on:click|preventDefault={logout}
									class="w-full bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
								>

									<svg xmlns="http://www.w3.org/2000/svg" class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
									  </svg>
									Logout
									</button>
				</div>

				<div class="flex-shrink-0 flex border-t border-gray-200 p-4" />
			</div>
		</div>
	</div>
	<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
		<div class="lg:hidden">
			<div
				class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5"
			>
				<div>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-purple-primary.svg"
						alt="Workflow"
					/>
				</div>
				<div>
					<button
						type="button"
						on:click={toggleMobileMenuOpen}
						class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
					>
						<span class="sr-only">Open sidebar</span>
						<!-- Heroicon name: outline/menu -->
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div class="flex-1 relative z-0 flex overflow-hidden">
			<slot />
		</div>
	</div>
</div>
