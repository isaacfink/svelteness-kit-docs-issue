import { activePackage } from "$lib/stores/store";

// regex function to validate phone number
export const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneNumberRegex.test(phoneNumber);
}

// regex function to validate email
export const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

// function to calculate distance between two coordinates in miles
export const distance = (lat1, lon1) => {
    if ((lat1 == 41.112370) && (lon1 == -74.069120)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * 41.112370/180;
        var theta = lon1-(-74.069120);
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 0.8684
        return dist;
    }
}

export const increaseAmount = (id) => {
    activePackage.update(current => {
        let found = false
        current.items.forEach(item => {
            let found = item.products.find(product => product.id === id);
            if (found) {
                found.quantity++;
            }
        })
        if(!found) {
            current.items.push({
                products: [{
                    id: id,
                    quantity: 1
                }]
            })

        }
        return current
    })
}

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});