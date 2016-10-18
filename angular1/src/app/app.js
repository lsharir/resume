import angular from 'angular';

import 'style/app.scss';

import { app } from './components/app/app.component.js';
import { category } from './components/category/category.component.js';
import { subject } from './components/subject/subject.component.js';
import { tag } from './components/tag/tag.component.js';
import { contact } from './components/contact/contact.component.js';

import { printContactDetails } from './components/print/print-contact-details.component.js';

import { subjectYears } from './filters/subjectYears.filter.js';
import { SiftService } from './services/sift.service.js';

import { appConfig } from './config/app.config.js';

const MODULE_NAME = 'resume';

angular.module(MODULE_NAME, [
		require('angular-animate'),
		require('angulartics'),
		require('angulartics-google-analytics')
	])
	.directive('app', app)
	.component('category', category)
	.component('subject', subject)
	.component('tag', tag)
	.component('contact', contact)
	.component('printContactDetails', printContactDetails)
	.filter('subjectYears', subjectYears)
	.service('SiftService', SiftService)
	.config(appConfig)
	;

export default MODULE_NAME;

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', () => {
		let FastClick = require('fastclick');
        FastClick.attach(document.body);
    }, false);
}