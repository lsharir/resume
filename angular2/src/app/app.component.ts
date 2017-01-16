import { Component, EventEmitter } from '@angular/core';
import { RevealService, UtilitiesService, IndexService } from './services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	public desktop: Boolean;
	public sourceCode: string;
	public contactMethods;
	public resume;
	public exampleTags;
	public keywords: Array<string> = [];

	public filterResumeContactMethodsEmitter: EventEmitter<any> = new EventEmitter();

	public data;

	constructor(
		private utils: UtilitiesService,
		private indexService: IndexService,
		private reveal: RevealService
	) {
		/* Importing the raw data that the resume consists from */
		this.contactMethods = this.utils.importContactMethods();
		this.resume = this.utils.importResume();

		this.indexService.indexResume(this.resume);

		/* Importing our example tags */
		this.exampleTags = this.utils.importExampleTags();

		this.data = {
			categories: [],
			subjectsByType: [],
			resultsFound: false
		};

		this.animationSequence();
	}

	animationSequence() {
		let globalsAvailabilityChecker,
			globalsAdditionalWait = 0,
			exampleTag = { active : true , text : 'Angular2' },
			animate;

		this.exampleTags.unshift(exampleTag);
		this.changeKeywords(['angular2']);

		animate = () => {
			this.reveal.execute([
				() => {
					globalsAdditionalWait = Math.max(0, (1000 - (Date.now() - window['loaderStart'])));
				},
				this.reveal.waitAndIncrement(globalsAdditionalWait, 0),
				() => {
					window['flipLoader']();
				},
				this.reveal.waitAndIncrement(100, 1),
				this.reveal.waitAndIncrement(600, 1),
				this.reveal.waitAndIncrement(300, 1),
				this.reveal.waitAndIncrement(300, 1),
				this.reveal.waitAndIncrement(1000, 0),
				() => {
					exampleTag.active = false;
					this.changeKeywords([]);
				},
				this.reveal.waitAndIncrement(300, 1)
			])
		}

		globalsAvailabilityChecker = setInterval(() => {
			if (window['loaderStart'] && window['flipLoader']) {
				clearInterval(globalsAvailabilityChecker);
				animate();
			}
		}, 100, 0, false);
	}

	changeKeywords(keywords) {
		this.keywords = keywords;
		this.filterResume();
	}

	filterResume() {
		this.data = this.utils.filterResume(this.resume, this.contactMethods, this.keywords);
		/** Emitting a change has occured down to the contacts-method component */
		this.filterResumeContactMethodsEmitter.emit();
	}

	flipApp() {
		window['backToConsole']();
	}
}
