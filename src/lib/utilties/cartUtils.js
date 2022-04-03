// imports
import {activePackage, cart, selectedItem, selectedProduct} from '../stores/store'
let activePkg
let localCart
let activeItem
let activeProduct

activePackage.subscribe(pkg => activePkg = pkg)
cart.subscribe(cart => localCart = cart)
selectedItem.subscribe(item => activeItem = item)
selectedProduct.subscribe(product => activeProduct = product)



// increase amount
export function increase(p){
    console.log(activePkg);
    let additional = localCart.category.type != 'A_1' || localCart?.packages?.some(pgk => pgk.id === p.id)
    let currentItem = activePkg?.items.find(item => item.id === activeItem.id)

    if(!currentItem){
        activePackage.update(current => {
            current.items.push({
                name:activeItem.name,
                id:activeItem.id,
                minimumAmount:activeItem.minimumAmount,
                image:activeItem.image,
                products: [{
                    name:p.name,
                    id:p.id,
                    price:p.price,
                    quantity:1
                }]
            })
            return current
        })
        return true
    }else{
        if (!additional) {
            console.log('not additional');
            activePackage.update(current => {
                let currentItem = current.items.find(item => item.id === activeItem.id)
                console.log(currentItem);
                currentItem.products = [
                    {
                        name:p.name,
                        id:p.id,
                        price:p.price,
                        quantity:1
                    }
                ]
                return current
            })
            return true
        }
        
        let currentProduct = currentItem.products.find(product => product.id === p.id)
        if(currentProduct){
            activePackage.update(current => {
                current.items.find(item => item.id === activeItem.id).products.find(product => product.id === p.id).quantity++
                return current
            }
            )
            return true
        }else{
            activePackage.update(current => {
                current.items.find(item => item.id === activeItem.id).products.push({
                    name:p.name,
                    id:p.id,
                    price:p.price,
                    quantity:1
                })
                return current
            }
            )
            return true
        }
    }
}

// decrease amount
export function decrease(p){
    if (localCart.category.type == 'A_1' && !checkTotalForItem(activeItem)){
        return
    }
    let currentItem = activePkg.items.find(item => item.id === activeItem.id)
    let currentProduct = currentItem.products.find(product => product.id === p.id)
    if(checkTotalForItem(activeItem)){
        activePackage.update(current => {
            current.items.find(item => item.id === activeItem.id).products.find(product => product.id === p.id).quantity--
            return current
        })
        return true
    }else{
        return true
    }
}

// increase amount for option
export function increaseOption(p){
    console.log(activePkg);
    let additional = localCart.category.type != 'A_1' || localCart?.packages?.some(pgk => pgk.id === activePkg.id)
    let currentItem = activePkg?.items.find(item => item.id === activeItem.id)

    if(!currentItem){
        activePackage.update(current => {
            current.items.push({
                name:activeItem.name,
                id:activeItem.id,
                minimumAmount:activeItem.minimumAmount,
                image:activeItem.image,
                products: [{
                    name:activeProduct.name,
                    id:activeProduct.id,
                    price:activeProduct.price,
                    minimumAmount:activeProduct.minimumAmount,
                    options:[
                        {
                            name:p.name,
                            id:p.id,
                            price:p.price,
                            quantity:1
                        }
                    ]
                }]
            })
            return current
        })
        return true
    }else{
        if (!additional) {
            activePackage.update(current => {
                let currentItem = current.items.find(item => item.id === activeItem.id)
                console.log(currentItem);
                currentItem.products = [
                    {
                        name:activeProduct.name,
                        id:activeProduct.id,
                        price:activeProduct.price,
                        minimumAmount:activeProduct.minimumAmount,
                        options:[
                            {
                                name:p.name,
                                id:p.id,
                                price:p.price,
                                quantity:1
                            }
                        ]
                    }
                ]
                return current
            })
            return true
        }
        let currentProduct = currentItem.products.find(product => product.id === activeProduct.id)
        if(currentProduct){
            let currentOption = currentProduct.options.find(o => o.id === p.id)
            if(currentOption){
                activePackage.update(current => {
                    current.items.find(item => item.id === activeItem.id).products.find(product => product.id === activeProduct.id).options.find(o => o.id === p.id).quantity++
                    return current
                }
            )
            }else{
                activePackage.update(current => {
                    current.items.find(item => item.id === activeItem.id).products.find(product => product.id === activeProduct.id).options.push(
                        {
                            name:p.name,
                            price:p.price,
                            id:p.id,
                            quantity:1
                        }
                    )
                    return current
                })
            }
            
            return true
        }else{
            activePackage.update(current => {
                current.items.find(item => item.id === activeItem.id).products.push({
                    name:activeProduct.name,
                    id:activeProduct.id,
                    price:activeProduct.price,
                    options:[
                        {
                            name:p.name,
                            id:p.id,
                            price:p.price,
                            quantity:1
                        }
                    ]
                })
                return current
            }
            )
            return true
        }
    }
}

// decrease amount for option
export function decreaseOption(o){
    if (localCart.category.type == 'A_1' && !checkTotalForItem(activeItem)){
        return
    }
    let currentItem = activePkg.items.find(item => item.id === activeItem.id)
    let currentProduct = currentItem.products.find(product => product.id === activeProduct.id)
    let currentOption = currentProduct.options.find(option => o.id === option.id)
    if(checkTotalForItem(activeItem)){
        activePackage.update(current => {
            current.items.find(item => item.id === activeItem.id).products.find(product => product.id === activeProduct.id).options.find(option => o.id === option.id).quantity--
            return current
        })
        return true
    }else{
        return true
    }
}

// check if item has enough products
export function checkTotalForItem(item){
    let currentItem = activePkg.items.find(i => i.id === item.id)
    let total = 0
    currentItem.products.forEach(product => {
        if (product.quantity) {
            
            total += product.quantity
        }else{
            let secTotal = 0
            product.options.forEach(option => {
                secTotal += option.quantity
            }
            )
            total += secTotal

        }
    })
    console.log(total);
    console.log(item.minimumAmount);
    return total > item.minimumAmount
}

// add to cart
export function addToCart(){
    cart.update(current => {
        let found = current.packages.find(p => p.id == activePkg.id)
        if(found){
            found = activePkg
        }else{
            current.packages.push(activePkg)
        }
        console.log(current)
        return current
    })
}

export function removeFromCart(id){
    cart.update(current => {
        current.packages = current.packages.filter(p => p.id != id)
        return current
    })
}
