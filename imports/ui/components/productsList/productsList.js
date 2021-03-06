import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/stevezhu:lodash';
import template from './productsList.html';

import { Categories } from '../../../api/categories';

import productCards from '../productCards/productCards';
import productDetails from '../productDetails/productDetails';

function ProductsListCtrl($scope, $state, $stateParams, $reactive) {
  'ngInject';

  $reactive(this).attach($scope);

  this.holidays = true;

  this.go = $state.go;

  this.showGST = true;

  this.subscribe('categories');
  this.subscribe('producer', () => [this.getReactively('stateParams.producer')]);

  this.stateParams = angular.copy($stateParams);

  this.query = {
    category: $stateParams.category,
    producer: $stateParams.producer,
    filter: '',
  };

  if ($stateParams.producer) {
    this.producer = Meteor.users.findOne($stateParams.producer);
  }

  this.helpers({
    categories() {
      return Categories.find();
    },
    // products() {
    //   return Products.find()
    // }
  });

  this.options = {
    sort: { last_modified: -1 },
  };
  this.sortName = 'Recently Changed';

  this.autorun(() => {
    if (this.stateParams.category) {
      this.selectedCategory = _.indexOf(_.pluck(Categories.find().fetch(), 'name'), this.stateParams.category) + 1;
    } else {
      this.selectedCategory = 0;
    }
  });
}
export const name = 'productsList';

export default angular.module(name, [
  uiRouter,
  productCards.name,
  productDetails.name,
]).component(name, {
  controller: ProductsListCtrl,
  controllerAs: 'store',
  template,
}).config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('store', {
      url: '/?name&certification&producer&search&category',
      template: '<products-list></products-list>',
    });
});
