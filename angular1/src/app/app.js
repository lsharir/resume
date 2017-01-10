import angular from 'angular';

/** Directives and Components */
import { AppDirective } from './components/app/app.component.js';
import { ResumeSearchComponent } from './components/resume-search/resume-search.component';
import { CategoryComponent } from './components/category/category.component.js';
import { SubjectComponent } from './components/subject/subject.component.js';
import { TagComponent } from './components/tag/tag.component.js';
import { PrintContactDetailsComponent } from './components/print/print-contact-details.component.js';
import { ContactDetailsMethodsComponent } from './components/contact-details-methods/contact-details-methods.component';

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
	.component('resumeSearch', new ResumeSearchComponent)
	.component('category', new CategoryComponent)
	.component('subject', new SubjectComponent)
	.component('tag', new TagComponent)
	.component('printContactDetails', new PrintContactDetailsComponent)
	.component('contactDetailsMethods', new ContactDetailsMethodsComponent)
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