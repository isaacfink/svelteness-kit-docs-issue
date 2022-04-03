import { gql } from '@urql/svelte';

export const GET_CATEGORIES_ADMIN = gql`
  query{
    categories{
      name
      id
    }
  }
`;

export const GET_PACKAGES_ADMIN = gql`
  query($cat: Int){
    packages(categoryId: $cat){
      name
      id
    }
  }
`;

export const GET_SCHEDULES_ADMIN = `
query{
  schedules{
    name
    id
  }
}
`

export const ALL_CATEGORIES = `
query{
    categories{
      name
      id
      image
      icon
      type
      description
      minimumPrice
      schedule{
        orderBy
      }
    }
  }
`

export const CATEGORY = `
query($id:Int!){
    category(id:$id){
      name
      image
      sideBarText
      description
      id
      minimumPrice
      type
      schedule{
        id
      }
      packageSet{
        name
        id
        image
        description
      }
    }
  }
`

export const PACKAGE = `
query($id:Int!){
    package(id:$id){
      name
      description
      image
      items{
        name
        displayName
        id
        products{
          name
          image
          price
          options{
            name
            image
            id
            price
          }
        }
      }
    }
  }
`

export const PACKAGE_DETAILS = `
query($id:Int!){
  package(id:$id){
    name
    id
    items{
      name
      id
      displayName
      minimumAmount
      products{
        minimumAmount
        name
        description
        price
        id
        options{
          name
          price
          description
          id
          minimumAmount
        }
      }
    }
  }
}
`
export const SCHEDULE = `
query($id:Int!){
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
    orderBy
  }
}
`

export const CREATE_ORDER = `
mutation(
    $name:String!,
    $email:String!,
    $phone:String!,
    $card:String!,
    isDelivery:Boolean!,
    $address:String!,
    isGift:Boolean!,
    $giftFrom:String!,
    $giftTo:String!,
    $giftMessage:String!,
    $packages:order_package_input!
){
    createOrder(
      name:$name,
      email:$email,
      phone:$phone
      card:$card,
      isDelivery:$isDelivery,
      deliveryAddress:$deliveryAddress,
      isGift:$isGift,
      giftFrom:$giftFrom,
      giftTo:$giftTo,
      giftMessage:$giftMessage,
      packages:$packages
    )
    {
      response{
        success
        message
        order{
          card
          paid
          name
          isDelivery
          address
          scheduledTime
        }
      }
    }
  }
`