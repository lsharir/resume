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
  constructor($scope, SiftService) {
    let ctrl = this;

    this.name = 'Liran Sharir';

    let rawSubjects = require('../../../shared/subjects.js'),
      rawCategories = require('../../../shared/categories.js');

    this.data = {
      subjects: [],
      categories: [],
      subjectsByType: []
    };

    this.selectedTags = [

    ];

    this.defaultTags = [
      { text: '2016', active: false },
      { text: 'angular2', active: false },
      { text: 'experience', active: false }
    ];

    this.focusOnInput = function () {
      document.getElementById('search').focus();
    };

    this.inputKeyUp = function (e) {
      if (e.keyCode === 32 || e.keyCode === 13) {
        let tags = $scope.query.split(' ');
        tags.forEach(tag => {
          addTag(tag);
        });
        $scope.query = '';
      }

      if (e.keyCode === 8 && $scope.query.length === 0) {
        ctrl.selectedTags.splice(ctrl.selectedTags.length - 1, 1);
      }
    };

    function addTag(tag) {
      if (tag.length !== 0) {
        let exists = false;

        ctrl.selectedTags.forEach(existingTag => {
          exists = exists || existingTag === tag;
        });

        if (!exists) {
          ctrl.selectedTags.push(tag);
        }
      }
    }

    $scope.query = '';

    $scope.$watch('query', function (newValue) {

      let tags = newValue.split(' ');

      
      // let newData = {
      //   subjects: [],
      //   categories: [],
      //   subjectsByType: []
      // },
      //   yearMatches = newValue.match(/\b([0-9]{4})\b/g),
      //   years = yearMatches ? yearMatches.map(year => Number(year)) : [],
      //   yearsLength = years.length,
      //   tags = newValue.split(' ');
      // ;

      // ctrl.tags = tags;

      // rawSubjects.forEach(subject => {
      //   if (inYear(subject, years, yearsLength)) {
      //     addSubjectByType(newData.subjectsByType, subject);
      //     newData.subjects.push(subject);
      //   }
      // });

      // rawCategories.forEach(category => {
      //   newData.categories.push(category);
      // });

      // ctrl.data = newData;
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
import { tag } from './components/tag/tag.component.js';
import { subjectYears } from './filters/subjectYears.filter.js';
import { SiftService } from './services/sift.service.js';

const MODULE_NAME = 'resume';

angular.module(MODULE_NAME, [require('angular-animate')])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .component('category', category)
  .component('subject', subject)
  .component('tag', tag)
  .filter('subjectYears', subjectYears)
  .service('SiftService', SiftService)
  ;

export default MODULE_NAME;