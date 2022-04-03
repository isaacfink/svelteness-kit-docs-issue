// all categories
export const ALL_CATEGORIES = gql`
query{
    categories{
      name
      id
      image
      icon
      schedule{
        orderBy
      }
    }
  }
`

// category details
export const CATEGORY = gql`
query($id:Int!){
    category(id:$id){
      name
      id
      sideBarText
      minimumPrice
      type
      packageSet{
        name
        id
        image
        description
      }
    }
  }
`

// package details
export const PACKAGE = gql`
query($id:Int!){
    package(id:$id){
      name
      id
      items{
        id
        name
        displayName
        minimumAmount
        products{
          name
          id
          image
          minimumAmount
          description
          price
          options{
            name
            id
            image
            minimumAmount
            description
            price
          }
        }
      }
    }
  }
`

export const SCHEDULE = gql`
query($id:Int!){
    category(id:$id){
      schedule{
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
  }
`
