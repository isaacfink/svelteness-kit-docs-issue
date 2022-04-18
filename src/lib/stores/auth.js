import { writable } from "svelte/store"
import {browser} from '$app/env'

export const auth = writable( browser && JSON.parse(localStorage.getItem('auth')) || {isAuthenticated:false})

auth.subscribe(data => browser && localStorage.setItem('auth', JSON.stringify(data)))