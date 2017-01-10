import { Component } from '@angular/core';
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
  public userLiveTag: string;
  public userCreatedTags: Array<any>;
  public exampleTags;

  public data;

  constructor(
    private utils: UtilitiesService,
    private index: IndexService
  ) {
    /* Setting the desktop variable to false when user is on mobile*/
    this.desktop = this.utils.isAppRunningOnDesktop();
    
    /* Importing the raw data that the resume consists from */
    this.sourcecode = require('../../../shared/config.js').sourcecode;
    this.contactMethods = this.utils.importContactMethods();
		this.resume = this.utils.importResume();

    this.index.indexResume(this.resume);

    /* Array of currently selected tags through free-typing */
		this.userLiveTag = '';
		this.userCreatedTags = []
		this.exampleTags = this.utils.importExampleTags();

    this.data = {
			categories: [],
			subjectsByType: [],
			resultsFound: false
		};

		this.filterResume();
  }

  tagChangeHandler(event) {
		this.userLiveTag = event.userLiveTag;
		this.filterResume();
	}

	filterResume() {
		let tags = this.index.getAllTags(this.userLiveTag, this.userCreatedTags, this.exampleTags);
		this.data = this.utils.filterResume(this.resume, this.contactMethods, tags);
	}

	printDocument() {
		window.print();
	}

	showCode() {
		window.location.href = this.sourcecode;
	}
}
