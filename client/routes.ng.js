angular.module("food-coop").run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('store');
    } else if (error === "FORBIDDEN") {
      $state.go('store');
    }
  });
}]);

angular.module('food-coop').config( function($urlRouterProvider, $stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('store', {
      url: '/store?name&category&certification&producer&favourite&lastOrdered&search',
      templateUrl: 'client/products/views/products-list.ng.html',
      controller: 'ProductsListCtrl'
    })
    .state('productDetails', {
      url: '/product/:productId',
      templateUrl: 'client/products/views/product-details.ng.html',
      controller: 'ProductDetailsCtrl',
      controllerAs: 'ctrl',
      // resolve: {
      //   "admin" : function($meteor) {
      //     return $auth.requireValidUser(isAdmin);
      //   }
      // }
    })
    .state('productCreate', {
      url: '/new-product',
      templateUrl: 'client/products/views/product-create.ng.html',
      controller: 'ProductCreateCtrl',
      controllerAs: 'ctrl',
      resolve: {
        "currentUser" : function($auth) {
          return $auth.requireUser();
        }
      }
    })
    .state('faq', {
      url: '/faq',
      templateUrl: 'client/static/views/faq.ng.html',
    })
    .state('about', {
      url: '/about-us',
      templateUrl: 'client/static/views/about.ng.html',
    })
    .state('profile', {
      url: '/me',
      templateUrl: 'client/user/views/profile.ng.html',
      controller: 'ProfileCtrl',
      resolve: {
        "currentUser" : function($auth) {
          return $auth.requireUser();
        }
      }
    })
    ;

    $urlRouterProvider.otherwise('/store');
});


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin')
}
