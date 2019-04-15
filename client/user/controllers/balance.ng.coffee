angular.module('food-coop').controller 'UserBalanceCtrl', ($scope, $reactive) ->
  $reactive(this).attach($scope)

  this.helpers
    orders: ->
      Orders.find()
    sales: ->
      Sales.find()
    total: ->
      _.sum _.pluck( Orders.find().fetch(), 'orderTotal' )



# ---
# generated by js2coffee 2.1.0
