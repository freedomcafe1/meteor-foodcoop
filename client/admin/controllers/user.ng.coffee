angular.module('food-coop').controller 'UserAdminCtrl', ($scope, $rootScope, $meteor, $stateParams, $mdToast) ->
  $scope.hubs = $meteor.collection(Hubs).subscribe('hubs')

  $scope.validate = (isValid) ->
    if isValid
      $scope.user.save().then (num) ->
        $scope.success()
        return
      , (err) ->
        console.log err
    else
      $scope.submitted = true
    return

  $scope.success = ->
    $mdToast.show $mdToast.simple().content('Saved Successfully').position('bottom left').hideDelay(3000)
    return

  $scope.$watch 'wholesaleUser', (newValue, oldValue) ->
    if newValue and $scope.user? and oldValue != undefined
      $meteor.call('addRole', $scope.user._id, 'wholesaleBuyer').then ->
          $mdToast.show $mdToast.simple().content('User is now a "Wholesale Buyer"').position('bottom left').hideDelay(3000)
      return
    else if not newValue and $scope.user? and oldValue != undefined
      $meteor.call('removeRole', $scope.user._id, 'wholesaleBuyer').then ->
          $mdToast.show $mdToast.simple().content('User is no longer a "Wholesale Buyer"').position('bottom left').hideDelay(3000)

      return

  $scope.$meteorSubscribe('user',$stateParams.userId).then ->
    $scope.user = $scope.$meteorObject(Meteor.users, $stateParams.userId, false)

    if Roles.userIsInRole $stateParams.userId, 'wholesaleBuyer'
      $scope.wholesaleUser = yes
    else
      $scope.wholesaleUser = no

  return

# ---
# generated by js2coffee 2.1.0
