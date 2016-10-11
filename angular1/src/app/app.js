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
		let ctrl = this,
			sift = SiftService;

		this.$scope = $scope;
		this.sift = SiftService;
		this.name = 'Liran Sharir';
		this.rawSubjects = require('../../../shared/subjects.js');
		this.rawCategories = require('../../../shared/categories.js');
		this.data = {
			subjects: [],
			categories: [],
			subjectsByType: []
		};
		this.selectedTags = [];
		this.defaultTags = [
			{ text: '2016', active: false },
			{ text: 'angular2', active: false },
			{ text: 'experience', active: false }
		];

		sift.indexSubjects(this.rawSubjects);
		sift.indexCategories(this.rawCategories);
		this.rawSubjectsByType = sift.subjectsByType(this.rawSubjects);

		$scope.query = '';

		$scope.$watch('query', function (newValue) {
			let writtenTags = ctrl.$scope.query.split(' '),
				tags;

			if (Array.isArray(writtenTags) && writtenTags.length > 0) {
				for (let i = 0; i < writtenTags.length - 1; i++) {
					ctrl.addTag(writtenTags[i]);
				}

				ctrl.$scope.query = writtenTags[writtenTags.length - 1];
			}

			tags = ctrl.getTags(ctrl.$scope.query);
			ctrl.filterResume(tags);
		});
	}

	addTag(tag) {
		if (tag.length !== 0) {
			let exists = false;

			this.selectedTags.forEach(existingTag => {
				exists = exists || existingTag === tag;
			});

			if (!exists) {
				this.selectedTags.push(tag);
			}
		}
	}

	inputKeyUp(e) {
		if (e.keyCode === 13) {
			let tags = this.$scope.query.split(' ');
			tags.forEach(tag => {
				this.addTag(tag);
			});
			this.$scope.query = '';
		}

		if (e.keyCode === 8 && this.$scope.query.length === 0) {
			this.selectedTags.splice(this.selectedTags.length - 1, 1);
			this.filterResume(this.getTags());
		}
	}

	focusOnInput() {
		document.getElementById('search').focus();
	}

	getTags(textQuery) {
		return this.sift.getTags(textQuery, this.selectedTags, this.defaultTags);
	}

	toggleDefault(tag) {
		tag.active = !tag.active;
		this.filterResume(this.getTags(this.$scope.query));
	}

	removeSelectedTag(index) {
		this.selectedTags.splice(index, 1);
		this.filterResume(this.getTags(this.$scope.query));
	}

	filterResume(tags) {
		let years = this.sift.getYears(tags),
			yearsLength = years.length,
			regularTags = this.sift.getRegularTags(tags),
			newData = {
				subjects: [],
				categories: [],
				subjectsByType: []
			}
		;

		this.rawCategories.forEach(category => {
			let categoryMatch = this.sift.categoryTagMatch(category, regularTags);
			newData.categories.push(category);

			if (true) {
				this.rawSubjectsByType[category.type].forEach(subject => {
					let subjectMatch = true;

					subjectMatch = (subjectMatch
						&& this.sift.subjectTagMatch(subject, regularTags)
						|| categoryMatch)
						&& this.sift.inYear(subject, years, yearsLength);

					if (subjectMatch) {
						this.sift.addSubjectByType(newData.subjectsByType, subject);
						newData.subjects.push(subject); //TODO this may be unnecessary
					}
				});
			}
		});

		

		this.data = newData;
	};
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