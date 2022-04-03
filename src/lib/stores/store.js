import { writable } from "svelte/store"
import {browser} from '$app/env'

export const activePackage = new writable({
    name: '',
    id: '',
    items: [],
})

export const currentPackageErrors = new writable([])

export const checkoutData = new writable({})

export const canContinue = new writable(false)

export const orderNavigationData = new writable({})

export const packagesInCart = new writable([])

export const currentPackagePricing = new writable({})

export const selectedItem = new writable()

export const selectedProduct = new writable()

export const cart = writable( browser && JSON.parse(localStorage.getItem('cart')) || {packages:[]})

cart.subscribe(data => browser && localStorage.setItem('cart', JSON.stringify(data)))