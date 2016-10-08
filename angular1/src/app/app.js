import angular from 'angular';

import '../style/app.scss';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: '$ctrl'
  }
};

class AppCtrl {
  constructor() {
    this.name = 'Liran Sharir';

    this.content = require('../../../shared/content.js');
  }
}

const MODULE_NAME = 'resume';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;