// all categories
export const CATEGORIES = `
query($search:String){
  categories(name_Icontains:$search){
    edges{
      node{
        id
        name
        pk
      }
    }
  }
}
`

// all packages
export const PACKAGES = `
query($search:String){
  packages(name_Icontains:$search){
    edges{
      node{
        pk
        id
        name
      }
    }
  }
  categories{
    edges{
      node{
        name
        pk
        id
      }
    }
  }
}
`

// all items
export const ITEMS = `
query{
    items{
      name
      id
    }
  }
`
// all products
export const PRODUCTS = `
query{
    products{
      edges{
        node{
          id
          name
          pk
        }
      }
    }
  }
`

// all options
export const OPTIONS = `
query{
    options{
      name
      id
    }
  }
`

// all schedules
export const SCHEDULES = `
query{
  schedules{
    edges{
      node{
        name
        id
        pk
      }
    }
  }
}
`

// all orders
export const ORDERS = `
query(
    $status:String
){
    orders(status:$status){
        name
        createdAt
        id
    }
}
`

// category details
export const CATEGORY = `
query($id:ID!){
  category(id:$id){
    name
    description
    id
    pk
    sideBarText
    minimumPrice
    image
    icon
    type
    schedule{
      id
    }
    packageSet{
      edges{
        node{
          id
          name
          pk
        }
      }
    }
  }
  schedules{
    edges{
      node{
        name
        id
        pk
      }
    }
  }
}
`

// packages details
export const PACKAGE = `
query($id:ID!){
  package(id:$id){
    name
    description
    pk
    id
    price
   	category{
      id
      pk
      name
    }
    items{
      edges{
        node{
          name
          id
          pk
        }
      }
    }
  }
  categories{
    edges{
      node{
        name
        pk
        id
      }
    }
  }
}
`

// item details

// product details

// option details

// schedule details
export const SCHEDULE = `
query($id:ID!){
  schedule(id:$id){
    name
    id
    sundayDelivery
    sundayStart
    sundayEnd
    sundayCutoff
    mondayDelivery
    mondayStart
    mondayEnd
    mondayCutoff
    tuesdayDelivery
    tuesdayStart
    tuesdayEnd
    tuesdayCutoff
    wednesdayDelivery
    wednesdayStart
    wednesdayEnd
    wednesdayCutoff
    thursdayDelivery
    thursdayStart
    thursdayEnd
    thursdayCutoff
    fridayDelivery
    fridayStart
    fridayEnd
    fridayCutoff
    saturdayDelivery
    saturdayStart
    saturdayEnd
    saturdayCutoff
  }
}
`

// coupon detais

// order details

