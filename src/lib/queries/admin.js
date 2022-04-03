export const ADD_CATEGORY = `
mutation{
    updateCategory(
      name:$name,
      description:$description,
      minimumPrice:$minimumPrice,
      sideBarText:$sideBarText,
      scheduleId:$scheduleId
    )
    {
      category{
        name
        id
        image
        icon
        description
        sideBarText
        minimumPrice
      }
    }
  }
`

export const UPDATE_CATEGORY = `
  mutation(
    $id:Int,
    $name:String!, 
    $sideBarText:String!, 
    $description:String!, 
    $minimumPrice:Decimal!,
    $type:String!,
    $schedule:Int!,
    $image:Upload,
    $icon:Upload
  ){
    updateCategory(
      id:$id, 
      name:$name, 
      sideBarText:$sideBarText, 
      description:$description, 
      minimumPrice:$minimumPrice,
      categoryType:$type,
      scheduleId:$schedule,
      image:$image,
      icon:$icon
    ){
      category{
        name
        id
      }
    }
  }
`

export const DELETE_CATEGORY = `
mutation($id:Int!){
  deleteCategory(id:$id){
    success
  }
}
`

export const REORDER_CATEGORIES_MUTATION = `
mutation($categories:[category_id_input_type]) {
  reorderCategory(categories:$categories)
  {
    categories{
      id
      name
    }
  }
}
`

export const REORDER_PACKAGES_MUTATION = `
mutation($packages:[package_id_input_type]) {
  reorderPackages(packages:$packages)
  {
    packages{
      id
      name
    }
  }
}
`

export const DELETE_PACKAGE = `
mutation($id:Int!){
  deletePackage(id:$id){
    success
  }
}
`

export const ALL_SCHEDULES = `
query{
  schedules{
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

export const SCHEDULE = `
query($id:Int!){
  schedule(id:$id){
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

export const ALL_SCHEDULES_LIMITED = `
  query{
    schedules{
      name
      id
    }
  }
`

export const CREATE_CATEGORY = ``

// export const LOGIN = `
// mutation($email:String!, $password:String!){
//   login(email:$email, password:$password){
//     token
//     user{
//       id
//       name
//       email
//     }
//   }
// }
//   `

export const LOGIN = `
mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
    refreshToken
  }
}
`

// export const DELETE_CATEGORY = `
// mutation{
//     deleteCategory(
//       id:$id
//     )
//     {
//       category{
//         name
