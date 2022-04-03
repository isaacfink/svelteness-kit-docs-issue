<script>
    export let pkg
    const deletedImages = []

    import Dropzone from "svelte-file-dropzone";
    let files = {
        accepted: [],
        rejected: []
    };

    function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];
        console.log(files);
    }

</script>

<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
    {#each pkg.images as image}
    <div class="rounded-md relative flex items-center justify-center group aspect-1 overflow-hidden">
        <img src="{image.image}" alt="" class="absolute inset-0">
        <button on:click={() => deletedImages.push(image.id)} type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 group-hover:z-40">
          Delete
          <!-- Heroicon name: solid/mail -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    {/each}
    <div class="col-span-6">
        <Dropzone on:drop={handleFilesSelect} />
        <p class="my-3 text-gray-800">Added images</p>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {#each files.accepted as item}
            <div class="rounded-md relative flex items-center justify-center group aspect-1 overflow-hidden">
                <img src="{item.image}" alt="" class="absolute inset-0">
            </div>
                <li>{item.name}</li>
            {/each}
        </div>

    </div>
</div>

<style global>
    @import 'filepond/dist/filepond.css';
    @import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>