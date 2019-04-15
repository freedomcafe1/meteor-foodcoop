angular.module('food-coop').controller 'TransactionCtrl', ($stateParams) ->
  'ngInject'
  this.transact = (amount, note) ->
    Meteor.users.update $stateParams.userId,
      $inc: 'profile.balance': amount

    status = if amount >= 0 then 'credited' else 'debited'

    Orders.insert {
      user: $stateParams.userId,
      recipient: $stateParams.userId,
      balanceAmount: Math.abs(amount)
      orderTotal: Math.abs(amount)
      status: status,
      note: note
    }
    # // Set back to pristine.
    this.amount = ''
    this.amountReason = ''
  return



# ---
# generated by js2coffee 2.1.0
