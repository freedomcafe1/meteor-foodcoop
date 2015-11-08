angular.module('food-coop').controller 'ResetCtrl',
($meteor, $state) ->
    vm = this
    vm.credentials = email: ''
    vm.error = ''

    vm.reset = ->
      $meteor.forgotPassword(vm.credentials).then (->
        $state.go 'store'
        return
      ), (err) ->
        vm.error = 'Error sending forgot password email - ' + err
        return
      return

    vm.facebookLogin = ->
      $meteor.loginWithFacebook
        requestPermissions: ['email']
      .then (result) ->
        console.log(result)
        return
      , (err) ->
        vm.error = "Login Error: #{err}"

    return

    return

# ---
# generated by js2coffee 2.1.0
