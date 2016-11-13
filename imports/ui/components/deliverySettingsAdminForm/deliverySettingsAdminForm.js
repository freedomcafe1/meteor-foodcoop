import angular from 'angular';

import templateUrl from './deliverySettingsAdminForm.html';

class deliverySettingsAdminFormController {
  save() {
    this.onInsert({ data: this.settings });
  }
}
const name = 'deliverySettingsAdminForm';

export default angular.module(name, []).component(name, {
  templateUrl,
  controller: deliverySettingsAdminFormController,
  controllerAs: name,
  bindings: {
    settings: '<',
    onInsert: '&',
  },
});
