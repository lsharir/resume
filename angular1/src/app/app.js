import angular from 'angular';

import 'style/app.scss';

/** Directives and Components */
import { AppDirective } from './components/app/app.component.js';
import { CategoryComponent } from './components/category/category.component.js';
import { SubjectComponent } from './components/subject/subject.component.js';
import { TagComponent } from './components/tag/tag.component.js';
import { ContactComponent } from './components/contact/contact.component.js';
import { PrintContactDetailsComponent } from './components/print/print-contact-details.component.js';

/** Services and Filters */
import { subjectYears } from './filters/subjectYears.filter.js';
import { SiftService } from './services/sift.service.js';
import { UtilitiesService } from './services/utilities.service.js';

/** Application configuration */
import { appConfig } from './config/app.config.js';

const MODULE_NAME = 'resume';

angular.module(MODULE_NAME, [
		require('angular-animate'),
		require('angulartics'),
		require('angulartics-google-analytics')
	])
	.directive('app', AppDirective)
	.component('category', new CategoryComponent)
	.component('subject', new SubjectComponent)
	.component('tag', new TagComponent)
	.component('contact', new ContactComponent)
	.component('printContactDetails', new PrintContactDetailsComponent)
	.filter('subjectYears', subjectYears)
	.service('SiftService', SiftService)
	.service('UtilitiesService', UtilitiesService)
	.config(appConfig)
	;

export default MODULE_NAME;

/* Patching up click/tap events using FastClick to make the UX smoother */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', () => {
		let FastClick = require('fastclick');
        FastClick.attach(document.body);
    }, false);
}