angular.module('food-coop').controller 'ActivateCtrl',
($meteor, $state, $stateParams) ->
    vm = this
    vm.password = ''
    vm.error = ''

    vm.set = ->
      $meteor.resetPassword($stateParams.token, vm.password).then (->
        $state.go 'store'
        return
      ), (err) ->
        vm.error = 'Error sending forgot password email - ' + err
        return
      return
    return

    return

# ---
# generated by js2coffee 2.1.0
