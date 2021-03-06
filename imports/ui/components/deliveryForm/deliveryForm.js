/* eslint-env browser*/
/* globals GetProductDeliveryDay GetNextDeliveryDay */
import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/stevezhu:lodash';
import moment from 'moment-timezone';
import { Deliveries } from '../../../api/deliveries';
import template from './deliveryForm.html';

class deliveryFormController {
  constructor($scope, $reactive, $mdDialog) {
    'ngInject';

    $reactive(this).attach($scope);
    this.deliveryAddress = Meteor.user().profile.deliveryAddress;

    this.deliveryDays = _.keys(_.groupBy(this.items, (item) => {
      const d = item.details.daysNotice || Meteor.settings.public.shoppingThreshold;
      return GetProductDeliveryDay(d).format();
    }));

    const added = (delivery) => {
      const clone = angular.copy(this.deliveryDays);
      for (let i = 0; i < clone.length; i++) {
        if (moment(clone[i]).isSame(moment(delivery.deliveryDay))) {
          _.remove(
            this.deliveryDays,
            d => d === moment(delivery.deliveryDay.toISOString()).format(),
          );
        }
      }
    };

    Deliveries.find({ userId: Meteor.userId() }).observe({
      added,
    });

    this.getDelivery = (targetEvent) => {
      $mdDialog.show({
        contentElement: '#deliveryForm',
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        targetEvent,
      });
    };

    this.close = () => $mdDialog.hide();
    this.selection = 'pickup';
  }

  submit(isValid) {
    if (isValid) {
      if (_.isObject(this.deliveryAddress)) {
        this.deliveryAddress = this.deliveryAddress.formatted_address;
      }
      this.addDelivery({ data: {
        deliveryMethod: this.selection,
        address: this.deliveryAddress,
        deliveryDays: this.deliveryDays,
      } });
      this.close();
    }
  }
}
export const name = 'deliveryForm';

export default angular.module(name, []).component(name, {
  template,
  controller: deliveryFormController,
  controllerAs: name,
  bindings: {
    deliveryOptions: '<',
    addDelivery: '&',
    items: '<',
  },
});
