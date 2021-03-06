import angular from 'angular';

import '../styles.scss';

/** App */
import { AppComponent } from './components/app/app.component.js';

/** Components */
import { ResumeSearchComponent } from './components/resume-search/resume-search.component';
import { CategoryComponent } from './components/category/category.component.js';
import { SubjectComponent } from './components/subject/subject.component.js';
import { TagComponent } from './components/tag/tag.component.js';
import { PrintContactDetailsComponent } from './components/print/print-contact-details.component.js';
import { ContactDetailsMethodsComponent } from './components/contact-details-methods/contact-details-methods.component';
import { ResumeHeaderComponent } from './components/resume-header/resume-header.component';
import { ResumeNoResultsComponent } from './components/resume-no-results/resume-no-results.component';
import { ResumeNavComponent } from './components/resume-nav/resume-nav.component';
import { ResumeFooterComponent } from './components/resume-footer/resume-footer.component';
import { AvatarComponent } from './components/avatar/avatar.component';

/** Directives */
import { 
	RevealOrderDirective,
	InitClipboardDirective
} from './directives';

/** Services and Filters */
import { subjectYears } from './filters/subjectYears.filter.js';

import { 
	AnalyticsService, 
	UtilitiesService, 
	IndexService,
	RevealService
} from './services';

/** Application configuration */
import { appConfig } from './config/app.config.js';

const MODULE_NAME = 'resume';

angular.module(MODULE_NAME, [
		require('angular-animate'),
		require('angulartics'),
		require('angulartics-google-analytics')
	])
	.component('appRoot', new AppComponent)
	.component('resumeSearch', new ResumeSearchComponent)
	.component('resumeHeader', new ResumeHeaderComponent)
	.component('resumeNoResults', new ResumeNoResultsComponent)
	.component('category', new CategoryComponent)
	.component('subject', new SubjectComponent)
	.component('tag', new TagComponent)
	.component('printContactDetails', new PrintContactDetailsComponent)
	.component('contactDetailsMethods', new ContactDetailsMethodsComponent)
	.component('resumeNav', new ResumeNavComponent)
	.component('resumeFooter', new ResumeFooterComponent)
	.component('avatar', new AvatarComponent)
	.directive('revealOrder', () => new RevealOrderDirective)
	.directive('initClipboard', () => new InitClipboardDirective)
	.filter('subjectYears', subjectYears)
	.service('IndexService', IndexService)
	.service('UtilitiesService', UtilitiesService)
	.service('AnalyticsService', AnalyticsService)
	.service('RevealService', RevealService)
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