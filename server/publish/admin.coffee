Meteor.publish 'userCount', ->
  Counts.publish this, 'userCount', Meteor.users.find()
  undefined

Meteor.publish 'orderCount', ->
  Counts.publish this, 'upcoming-ordersCount', Orders.find
    status: 'active'
  ,
    countFromField: 'qty'
  undefined

Meteor.publish 'product-count', ->
  Counts.publish this, 'product-count', Products.find()
  undefined

Meteor.publish 'order', (id) ->
  Orders.find _id:id

Meteor.publish 'orders', (deliveryDay) ->
  check(deliveryDay, String)

  if Roles.userIsInRole this.userId, 'admin'

    return Sales.find
      deliveryDay: new Date(deliveryDay)
  else
    console.log "cannot publish orders to non admin"

Meteor.publish "user-list", (options, searchstring) ->
  unless searchstring?
    searchstring = ""

  options.fields =
    profile:1,
    emails:1,
    roles: 1,
    createdAt: 1

  if Roles.userIsInRole this.userId, 'admin'

    Counts.publish this, 'filteredUserCount', Meteor.users.find(
      'profile.name':
        '$regex': ".*#{searchstring}"
        '$options': 'i'
    ), noReady: true

    return Meteor.users.find
      'profile.name':
        '$regex': ".*#{searchstring}"
        '$options': 'i'
    , options

Meteor.publish "user", (userId) ->

  if Roles.userIsInRole this.userId, 'admin'
    Meteor.users.find
      _id: userId
    , {limit:1, fields: profile:1,emails:1, createdAt:1, roles:1}
