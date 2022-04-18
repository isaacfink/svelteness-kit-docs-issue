<script>
	import { operationStore, query } from '@urql/svelte';
	import { PRODUCTS } from '$lib/queries/admin/queries';
	import Dropzone from 'svelte-file-dropzone';
	import Select from 'svelte-select';

	let productStore = operationStore(PRODUCTS);
	query(productStore);

	let selectedMenu = 'info';
	let pkg = {
		name: '',
		description: '',
		image: [],
		images: [],
		price: 0,
		pkg: '',
		items: []
	};

	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}

	function saveChanges() {}

	let products = [];
    productStore.subscribe((data) => {
        console.log(data)
        if (data.data) {
            console.log(data.data)
            let tempList = []
            data.data.products.edges.forEach(product => {
                tempList.push({
                    value: product.node.pk,
                    label: product.node.name
                })
            })
            products = tempList
        }
    });

	function extractId(list) {
		let tempList = [];
        console.log(list)
		list?.forEach((li) => {
			tempList.push(li.value);
		});
		if (!list) {
			return [];
		}
		return tempList;
	}

	function removeItem(item) {
        let id = item.id
        pkg.items = pkg.items.filter(i => i.id !== id)
	}
</script>

<p>new package</p>

<form on:submit|preventDefault={saveChanges} class="space-y-8 divide-y divide-gray-200 pb-5">
	<div class="space-y-8 divide-y divide-gray-200">
		<div>
			<div>
				<h3 class="text-lg leading-6 font-medium text-gray-900">New package</h3>
				<p class="mt-1 text-sm text-gray-500">New package.</p>
			</div>

			<div class="hidden sm:block">
				<div class="border-b border-gray-200">
					<nav class="-mb-px flex space-x-8" aria-label="Tabs">
						<!-- Current: "border-purple-primary text-purple-primary", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
						<button
							on:click|preventDefault={() => (selectedMenu = 'info')}
							class="{selectedMenu == 'info'
								? 'border-purple-primary text-purple-primary'
								: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
						>
							Info
						</button>

						<button
							on:click|preventDefault={() => (selectedMenu = 'items')}
							class="{selectedMenu == 'items'
								? 'border-purple-primary text-purple-primary'
								: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
						>
							Items
						</button>
					</nav>
				</div>
			</div>

			{#if selectedMenu == 'info'}
				<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
					<div class="sm:col-span-4">
						<label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
						<div class="mt-1 flex rounded-md shadow-sm">
							<input
								bind:value={pkg.name}
								type="text"
								name="name"
								id="name"
								autocomplete="none"
								class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
							/>
						</div>
					</div>

					<div class="sm:col-span-6">
						<label for="description" class="block text-sm font-medium text-gray-700">
							Description
						</label>
						<div class="mt-1">
							<textarea
								bind:value={pkg.description}
								id="description"
								name="description"
								rows="3"
								class="shadow-sm focus:ring-purple-primary focus:border-purple-primary block w-full sm:text-sm border border-gray-300 rounded-md"
							/>
						</div>
						<p class="mt-2 text-sm text-gray-500">pkg description.</p>
					</div>

					<div class="sm:col-span-3">
						<label for="image" class="block text-sm font-medium text-gray-700"> Image </label>
						<div class="mt-1 flex items-center">
							<span class="h-12 w-12 rounded-full overflow-hidden ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-full w-full text-gray-300"
									fill="currentColor"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<input
								bind:files={pkg.image}
								id="image"
								type="file"
								class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary"
							/>
						</div>
					</div>

					<div class="sm:col-span-3">
						<label for="price" class="block text-sm font-medium text-gray-700"> price </label>
						<div class="mt-1 flex items-center">
							<input
								bind:value={pkg.price}
								id="price"
								type="number"
								class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
							/>
						</div>
					</div>

                    <div class="sm:col-span-6">
						<label for="add-images" class="block text-sm font-medium text-gray-700"> Additional images </label>
						<div class="mt-1 flex items-center">
							<input
								bind:files={files}
                                multiple
								id="add-images"
								type="file"
								class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary"
							/>
						</div>
					</div>

					<div class="sm:col-span-6">
						<p class="block text-sm font-medium text-gray-700">Images</p>
						<Dropzone {handleFilesSelect} />
                        {files.accepted.length} images uploaded
					</div>
				</div>
			{:else if selectedMenu == 'items'}
				<p>items</p>
				{#each pkg.items as item (item.id)}
					<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 border-b pb-3">
						<div class="sm:col-span-5">
							<label for="name-{item.id}" class="block text-sm font-medium text-gray-700">
								Name
							</label>
							<div class="mt-1 flex rounded-md shadow-sm">
								<input
									bind:value={item.name}
									type="text"
									name="name-{item.id}"
									id="name-{item.id}"
									autocomplete="none"
									class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
								/>
							</div>
						</div>

						<div class="sm:col-span-4">
							<label for="display-name-{item.id}" class="block text-sm font-medium text-gray-700">
								Display name
							</label>
							<div class="mt-1 flex rounded-md shadow-sm">
								<input
									bind:value={item.displayName}
									type="text"
									name="display-name-{item.id}"
									id="display-name-{item.id}"
									autocomplete="none"
									class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
								/>
							</div>
						</div>

						<div class="sm:col-span-3">
							<label for="minimum-amount-{item.id}" class="block text-sm font-medium text-gray-700">
								Minimum amount
							</label>
							<div class="mt-1 flex rounded-md shadow-sm">
								<input
									bind:value={item.minimumAmount}
									type="number"
									name="minimum-amount-{item.id}"
									id="minimum-amount-{item.id}"
									autocomplete="none"
									class="flex-1 focus:ring-purple-primary focus:border-purple-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
								/>
							</div>
						</div>
						<div class="col-span-12">
							<div class="themed-select">
                                <Select
                                    items={products}
                                    isMulti={true}
                                    showChevron={true}
                                    on:select={(ev) => item.products = ev.detail}
                                />
                            </div>
                            <div class="flex justify-end">
                                <button on:click={removeItem(item)} class="text-red-500 ml-auto"> remove </button>
                            </div>
						</div>

					</div>
				{/each}
				<div class="flex justify-end">
                    <button
                    class="ml-3 inline-flex justify-center py-2 px-4 border-2 border-purple-primary shadow-sm text-sm font-medium rounded-md text-purple-primary bg-white hover:bg-gray-100 mt-5"
                        on:click={() =>
                            (pkg.items = [
                                ...pkg.items,
                                { name: '', products: [], displayName: '', minimumAmount: 0, id:pkg.items.length+1 }
                            ])}
                    >
                        New item
                    </button>
                </div>
			{/if}
		</div>
	</div>

	<div class="pt-5">
		<div class="flex justify-end">
			<a
				href="/admin/categories"
				class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary"
				>Cancel</a
			>
			<button
				on:click|preventDefault={saveChanges}
				type="submit"
				class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary"
				>Save</button
			>
		</div>
	</div>
</form>
{JSON.stringify(pkg, null, 2)}

<style>	
	/* 	
			CSS variables can be used to control theming.
			https://github.com/rob-balfre/svelte-select/blob/master/docs/theming_variables.md
	*/
	
	.themed-select {
		--borderFocusColor: 2px solid rgb(102 40 116);
		--borderRadius: 10px;
		--placeholderColor: rgb(209 213 219);
        --border: 1px solid rgb(209 213 219)
	}
	
</style>
