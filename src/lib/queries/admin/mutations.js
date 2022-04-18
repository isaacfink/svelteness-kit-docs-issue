// create category
export const CREATE_CATEGORY = `
mutation(
  $name:String!
  $description:String!
  $sideBarText:String!
  $type:categoryType
  $minimumPrice:Decimal
  $image:Upload
  $icon:Upload
){
  createCategory(input:{
    name:$name
    description:$description
    sideBarText:$sideBarText
    type:$type
    minimumPrice:$minimumPrice
    image:$image
    icon:$icon
  }){
    category{
      id
    }
  }
}
`

export const CREATE_SCHEDULE = `
mutation(
  $name:String!
  $sundayDelivery:Boolean, $sundayStart:Int, $sundayEnd:Int, $sundayCutoff:Int
  $mondayDelivery:Boolean, $mondayStart:Int, $mondayEnd:Int, $mondayCutoff:Int
  $tuesdayDelivery:Boolean, $tuesdayStart:Int, $tuesdayEnd:Int, $tuesdayCutoff:Int
  $wednesdayDelivery:Boolean, $wednesdayStart:Int, $wednesdayEnd:Int, $wednesdayCutoff:Int
  $thursdayDelivery:Boolean, $thursdayStart:Int, $thursdayEnd:Int, $thursdayCutoff:Int
  $fridayDelivery:Boolean, $fridayStart:Int, $fridayEnd:Int, $fridayCutoff:Int
  $saturdayDelivery:Boolean, $saturdayStart:Int, $saturdayEnd:Int, $saturdayCutoff:Int
){
  createSchedule(input:{
    name:$name
    sundayDelivery:$sundayDelivery, sundayStart:$sundayStart, sundayEnd:$sundayEnd, sundayCutoff:$sundayCutoff
    mondayDelivery:$mondayDelivery, mondayStart:$mondayStart, mondayEnd:$mondayEnd, mondayCutoff:$mondayCutoff
    tuesdayDelivery:$tuesdayDelivery, tuesdayStart:$tuesdayStart, tuesdayEnd:$tuesdayEnd, tuesdayCutoff:$tuesdayCutoff
    wednesdayDelivery:$wednesdayDelivery, wednesdayStart:$wednesdayStart, wednesdayEnd:$wednesdayEnd, wednesdayCutoff:$wednesdayCutoff
    thursdayDelivery:$thursdayDelivery, thursdayStart:$thursdayStart, thursdayEnd:$thursdayEnd, thursdayCutoff:$thursdayCutoff
    fridayDelivery:$fridayDelivery, fridayStart:$fridayStart, fridayEnd:$fridayEnd, fridayCutoff:$fridayCutoff
    saturdayDelivery:$saturdayDelivery, saturdayStart:$saturdayStart, saturdayEnd:$saturdayEnd, saturdayCutoff:$saturdayCutoff
  }){
    schedule{
    name
    id
    sundayDelivery, sundayStart, sundayEnd, sundayCutoff
    mondayDelivery, mondayStart, mondayEnd, mondayCutoff
    tuesdayDelivery, tuesdayStart, tuesdayEnd, tuesdayCutoff
    wednesdayDelivery, wednesdayStart, wednesdayEnd, wednesdayCutoff
    thursdayDelivery, thursdayStart, thursdayEnd, thursdayCutoff
    fridayDelivery, fridayStart, fridayEnd, fridayCutoff
    saturdayDelivery, saturdayStart, saturdayEnd, saturdayCutoff
  }
  }
}
`

export const UPDATE_CATEGORY = `
mutation(
  $id:ID!
  $name:String!
  $description:String!
  $sideBarText:String!
  $type:categoryType
  $minimumPrice:Decimal
  $image:Upload
  $icon:Upload
){
  updateCategory(id:$id,input:{
    name:$name
    description:$description
    sideBarText:$sideBarText
    type:$type
    minimumPrice:$minimumPrice
    image:$image
    icon:$icon
  }){
    category{
      id
    }
  }
}
`

export const UPDATE_PACKAGE = `
mutation(
  $id:ID!
  $name:String!
  $description:String!
  $sideBarText:String!
  $type:categoryType
  $minimumPrice:Decimal
  $image:Upload
  $icon:Upload
){
  updatePackage(id:$id,input:{
    name:$name
    description:$description
    sideBarText:$sideBarText
    type:$type
    minimumPrice:$minimumPrice
    image:$image
    icon:$icon
  }){
    category{
      id
    }
  }
}
`

export const UPDATE_SCHEDULE = `
mutation($id:ID!
  $name:String!
  $sundayDelivery:Boolean, $sundayStart:Int, $sundayEnd:Int, $sundayCutoff:Int
  $mondayDelivery:Boolean, $mondayStart:Int, $mondayEnd:Int, $mondayCutoff:Int
  $tuesdayDelivery:Boolean, $tuesdayStart:Int, $tuesdayEnd:Int, $tuesdayCutoff:Int
  $wednesdayDelivery:Boolean, $wednesdayStart:Int, $wednesdayEnd:Int, $wednesdayCutoff:Int
  $thursdayDelivery:Boolean, $thursdayStart:Int, $thursdayEnd:Int, $thursdayCutoff:Int
  $fridayDelivery:Boolean, $fridayStart:Int, $fridayEnd:Int, $fridayCutoff:Int
  $saturdayDelivery:Boolean, $saturdayStart:Int, $saturdayEnd:Int, $saturdayCutoff:Int
){
  updateSchedule(id:$id, input:{
    name:$name
    sundayDelivery:$sundayDelivery, sundayStart:$sundayStart, sundayEnd:$sundayEnd, sundayCutoff:$sundayCutoff
    mondayDelivery:$mondayDelivery, mondayStart:$mondayStart, mondayEnd:$mondayEnd, mondayCutoff:$mondayCutoff
    tuesdayDelivery:$tuesdayDelivery, tuesdayStart:$tuesdayStart, tuesdayEnd:$tuesdayEnd, tuesdayCutoff:$tuesdayCutoff
    wednesdayDelivery:$wednesdayDelivery, wednesdayStart:$wednesdayStart, wednesdayEnd:$wednesdayEnd, wednesdayCutoff:$wednesdayCutoff
    thursdayDelivery:$thursdayDelivery, thursdayStart:$thursdayStart, thursdayEnd:$thursdayEnd, thursdayCutoff:$thursdayCutoff
    fridayDelivery:$fridayDelivery, fridayStart:$fridayStart, fridayEnd:$fridayEnd, fridayCutoff:$fridayCutoff
    saturdayDelivery:$saturdayDelivery, saturdayStart:$saturdayStart, saturdayEnd:$saturdayEnd, saturdayCutoff:$saturdayCutoff
  }){
    schedule{
    name
    id
    sundayDelivery, sundayStart, sundayEnd, sundayCutoff
    mondayDelivery, mondayStart, mondayEnd, mondayCutoff
    tuesdayDelivery, tuesdayStart, tuesdayEnd, tuesdayCutoff
    wednesdayDelivery, wednesdayStart, wednesdayEnd, wednesdayCutoff
    thursdayDelivery, thursdayStart, thursdayEnd, thursdayCutoff
    fridayDelivery, fridayStart, fridayEnd, fridayCutoff
    saturdayDelivery, saturdayStart, saturdayEnd, saturdayCutoff
  }
  }
}
`

export const REORDER_CATEGORIES = `
mutation($order:[Int]!){
  reorderCategories(order:$order){
    categories{
      name
      id 
      pk
    }
  }
}
`

export const REORDER_PACKAGES = `
mutation($order:[Int]!){
  reorderPackages(order:$order){
    packages{
      name
      order
    }
  }
}
`

export const REORDER_ITEMS = `
mutation($order:[Int]!){
  reorderItems(order:$order){
    items{
      name
    }
  }
}
`

export const DELETE_CATEGORY = `
mutation($ids:[ID]!){
  deleteCategory(ids:$ids){
    missedIds
    deletedIds
  }
}
`
//  let schedule = {
//   "sundayDelivery":true, "sundayStart":1, "sundayEnd":20, "sundayCutoff":1,
//   "mondayDelivery":true, "mondayStart":1, "mondayEnd":20, "mondayCutoff":1,
//   "tuesdayDelivery":true, "tuesdayStart":1, "tuesdayEnd":20, "tuesdayCutoff":1,
//   "wednesdayDelivery":true, "wednesdayStart":1, "wednesdayEnd":20, "wednesdayCutoff":1,
//   "thursdayDelivery":true, "thursdayStart":1, "thursdayEnd":20, "thursdayCutoff":1,
//   "fridayDelivery":true, "fridayStart":1, "fridayEnd":20, "fridayCutoff":1,
//   "saturdayDelivery":true, "saturdayStart":1, "saturdayEnd":20, "saturdayCutoff":1,

// }
