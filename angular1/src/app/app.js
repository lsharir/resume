import angular from 'angular';

import 'style/app.scss';

import { app } from './components/app/app.component.js';
import { category } from './components/category/category.component.js';
import { subject } from './components/subject/subject.component.js';
import { tag } from './components/tag/tag.component.js';
import { subjectYears } from './filters/subjectYears.filter.js';
import { SiftService } from './services/sift.service.js';

const MODULE_NAME = 'resume';

angular.module(MODULE_NAME, [require('angular-animate')])
	.directive('app', app)
	.component('category', category)
	.component('subject', subject)
	.component('tag', tag)
	.filter('subjectYears', subjectYears)
	.service('SiftService', SiftService)
	;

export default MODULE_NAME;