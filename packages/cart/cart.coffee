# Write your package code here!
Cart = {}
Cart.Items = new Mongo.Collection('carts')
Cart.Items.allow
  insert: (userId, doc) ->
    no
  update: (userId, doc, fieldNames, modifier) ->
    no
  remove: (userId, doc) ->
    doc.userId is userId or doc.deviceId
  fetch: [ 'deviceId', 'userId' ]

if Meteor.isClient
  Cart.subscriptionHandles = userOrders: Meteor.subscribe('Cart-userOrders')

  Tracker.autorun ->
    if !Session.equals('deviceId', undefined)
      Cart.subscriptionHandles.deviceOrders = Meteor.subscribe('Cart-deviceOrders', Session.get('Cart-deviceId'))
    return
  
  Tracker.autorun ->
    if !Meteor.userId() and Session.equals('deviceId', undefined)
      deviceId = Random.id()
      Session.set 'deviceId', deviceId
    else if Meteor.userId() and Cart.Items.find(deviceId: Session.get('deviceId')).count() > 0
      Session.set 'deviceId', undefined
      # Meteor.call '/cart/loggedIn', Session.get('deviceId'), (err) ->
#         if err
#           return console.error(err)
#         Session.set 'deviceId', undefined
#         return
    return

Meteor.methods '/cart/loggedIn': (deviceId) ->
  #if deviceId
    # Cart.Items.update { deviceId: deviceId }, {
  #     $set: userId: @userId
  #     $unset: deviceId: 1
  #   }, multi: true
  return


if Meteor.isServer
	
  Meteor.publish "Cart-userOrders", () ->
    if @userId
      Cart.Items.find userId: @userId
    else
      @ready()
	
  Meteor.publish "Cart-deviceOrders", (deviceId) ->
    if deviceId
      check deviceId, String
      Cart.Items.find deviceId: deviceId
    else
      @ready()








# ---
# generated by js2coffee 2.1.0
