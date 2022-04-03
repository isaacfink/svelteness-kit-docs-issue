// all categories
export const CATEGORIES = `
query{
  categories{
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
query{
  packages{
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
      name
      id
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

// coupon detais

// order details

