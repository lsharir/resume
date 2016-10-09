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
  constructor($scope) {
    let ctrl = this;

    this.name = 'Liran Sharir';

    let rawSubjects = require('../../../shared/subjects.js'),
      rawCategories = require('../../../shared/categories.js');

    this.data = {
      subjects: [],
      categories: [],
      subjectsByType: []
    };

    $scope.query = '';

    $scope.$watch('query', function (newValue) {
      let newData = {
        subjects: [],
        categories: [],
        subjectsByType: []
      },
        yearMatches = newValue.match(/\b([0-9]{4})\b/g),
        years = yearMatches ? yearMatches.map(year => Number(year)) : [],
        yearsLength = years.length,
        tags = newValue.split(' ');
      ;

      ctrl.tags = tags;

      rawSubjects.forEach(subject => {
        if (inYear(subject, years, yearsLength)) {
          addSubjectByType(newData.subjectsByType, subject);
          newData.subjects.push(subject);
        }
      });

      rawCategories.forEach(category => {
        newData.categories.push(category);
      });

      ctrl.data = newData;
    });

    function addSubjectByType(subjectsByTypeArray, subject) {
      if (!subjectsByTypeArray[subject.type] || !subjectsByTypeArray[subject.type].length) {
        subjectsByTypeArray[subject.type] = [];
      }
      
      subjectsByTypeArray[subject.type].push(subject);
    }

    function inYear(subject, years, yearsLength) {
      for (let i = 0; i < yearsLength; i++) {
        if (subject.start > years[i] || subject.end < years[i]) {
          return false;
        }
      }
      return true;
    }
  }
}

import { category } from './components/category/category.component.js';
import { subject } from './components/subject/subject.component.js';

const MODULE_NAME = 'resume';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .component('category', category)
  .component('subject', subject)
  ;

export default MODULE_NAME;