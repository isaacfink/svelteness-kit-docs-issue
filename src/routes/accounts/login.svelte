<script context="module">
  export function load({ url }) {
    const redirect = url.searchParams.get('next') || '/admin';
    return {
      props: {
        redirect
      }
    };
  }
</script>

<script>
  export let redirect
  import {mutation} from '@urql/svelte'
  import {LOGIN} from '$lib/queries/admin/auth'
  import {auth} from '$lib/stores/auth'
  import {goto} from '$app/navigation'
  import {page} from '$app/stores'
import { onMount } from 'svelte';
  const loginMutation = mutation({query:LOGIN})

  async function login() {
    loginMutation({email,password})
    .then(result => {
      if (result.data.tokenAuth.success) {
        console.log('success');
        auth.update(current => {
          return {
            token: result.data.tokenAuth.token,
            refreshToken: result.data.tokenAuth.refreshToken,
            isAuthenticated: true,
            expires: new Date().setDate(new Date().getDate() + 6)
          }
        })
        goto(redirect)
      }else{
        console.log(result)
        if (result.data.tokenAuth.errors.nonFieldErrors) {
          error = result.data.tokenAuth.errors.nonFieldErrors[0].message
        }
      }
    })
  }

  let email
  let password
  let error = ''

  onMount(() => [
    console.log($page),
  ])
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
            <p class="mt-3">{error}</p>
          </div>
        </form>
  
      </div>
    </div>
  </div>
  