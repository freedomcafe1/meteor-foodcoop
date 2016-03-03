function Controller($scope) {
  var vm = this;
  
  vm.$onInit = function() {
    vm.canAnswer = vm.qAndACtrl.canAnswer()
  }
  
  vm.updateQuestion = function(modifier) {
    vm.onUpdate({item: vm.item, modifier: modifier});
  }
  
  return vm
  
}


angular.module('food-coop').component('qAndAItem', {
  templateUrl: 'client/request/components/questions/q-and-a-item.ng.html',
  controller: Controller,
  bindings: {
    item: '<',
    onUpdate: '&'
  },
  require: {
    qAndACtrl: '^qAndA'
  },
})