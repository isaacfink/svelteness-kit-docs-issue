<script>
  import {operationStore, query, mutation} from '@urql/svelte'
  import {LOGIN} from '$lib/queries/admin'

  const loginMutation = mutation({query:LOGIN})

  async function login() {
    loginMutation({username:email,password})
    .then(result => {
      console.log(result.data, result.error);
    })
  }

  let email
  let password
</script>

<div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="/images/Logo.svg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-purple-primary opacity-60">Sign in to the admin dashboard</h2>
    </div>
  
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST" on:submit|preventDefault={login}>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
            <div class="mt-1">
              <input id="email" bind:value={email} name="email" type="text" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-primary focus:border-purple-primary sm:text-sm">
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <input id="password" bind:value={password} name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-primary focus:border-purple-primary sm:text-sm">
            </div>
          </div>
  
  
          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-primary hover:bg-purple-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-primary">Sign in</button>
            <p>{email} {password} is not safe</p>
          </div>
        </form>
  
      </div>
    </div>
  </div>
  