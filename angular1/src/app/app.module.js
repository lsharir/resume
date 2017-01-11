import angular from 'angular';

import '../styles.scss';

/** Directives and Components */
import { AppDirective } from './components/app/app.component.js';
import { ResumeSearchComponent } from './components/resume-search/resume-search.component';
import { CategoryComponent } from './components/category/category.component.js';
import { SubjectComponent } from './components/subject/subject.component.js';
import { TagComponent } from './components/tag/tag.component.js';
import { PrintContactDetailsComponent } from './components/print/print-contact-details.component.js';
import { ContactDetailsMethodsComponent } from './components/contact-details-methods/contact-details-methods.component';
import { ResumeHeaderComponent } from './components/resume-header/resume-header.component';

/** Services and Filters */
import { subjectYears } from './filters/subjectYears.filter.js';

import { AnalyticsService, UtilitiesService, IndexService } from './services';

/** Application configuration */
import { appConfig } from './config/app.config.js';

const MODULE_NAME = 'resume';

angular.module(MODULE_NAME, [
		require('angular-animate'),
		require('angulartics'),
		require('angulartics-google-analytics')
	])
	.directive('appRoot', AppDirective)
	.component('resumeSearch', new ResumeSearchComponent)
	.component('resumeHeader', new ResumeHeaderComponent)
	.component('category', new CategoryComponent)
	.component('subject', new SubjectComponent)
	.component('tag', new TagComponent)
	.component('printContactDetails', new PrintContactDetailsComponent)
	.component('contactDetailsMethods', new ContactDetailsMethodsComponent)
	.filter('subjectYears', subjectYears)
	.service('IndexService', IndexService)
	.service('UtilitiesService', UtilitiesService)
	.service('AnalyticsService', AnalyticsService)
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