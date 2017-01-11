import { Component, EventEmitter } from '@angular/core';
import { UtilitiesService } from './services/utilities.service';
import { IndexService } from './services/index.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	public desktop: Boolean;
	public sourcecode: string;
	public contactMethods;
	public resume;
	public exampleTags;
	public keywords: Array<string> = [];

	public filterResumeContactMethodsEmitter: EventEmitter<any> = new EventEmitter();

	public data;

	constructor(
		private utils: UtilitiesService,
		private indexService: IndexService
	) {
		/* Setting the desktop variable to false when user is on mobile*/
		this.desktop = this.utils.isAppRunningOnDesktop();

		/* Importing the raw data that the resume consists from */
		this.sourcecode = this.utils.importSourcecodeLink();
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

		this.filterResume();
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

	printDocument() {
		window.print();
	}

	showCode() {
		window.open(this.sourcecode);
	}
}
