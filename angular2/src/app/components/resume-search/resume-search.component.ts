import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'resume-search',
	templateUrl: './resume-search.component.html',
	styleUrls: ['./resume-search.component.scss']
})
export class ResumeSearchComponent implements OnInit {
	@Input('userLiveTag') userLiveTag = '';
	@Input('userCreatedTags') userCreatedTags;
	@Input('exampleTags') exampleTags;
	@Output('tagChangeEmitter') tagChangeEmitter: EventEmitter<any> = new EventEmitter();

	/* Private properties that handles our debounced analytics function */
	private debouncedAnalyticsDuration = 1000;
	private debouncedAnalyticsRunning = undefined;
	constructor() { 
	}

	ngOnChanges() {
		let writtenTags = this.userLiveTag.split(' ');

		if (Array.isArray(writtenTags) && writtenTags.length > 0) {
			/* Pass every word of input but last to the tags */
			for (let i = 0; i < writtenTags.length - 1; i++) {
				this.addTag(writtenTags[i]);
			}

			/* Leave the remaining last word of input */
			this.userLiveTag = writtenTags[writtenTags.length - 1];
		}

		/* After handling the tags the user wrote down, and after calling the filterResume method,
			* We call our debounced analytics data (to record partial queries) */
		this.tagChangeEmitter.emit();

		this.debouncedAnalytics();

        this.focusOnInput();
	}

	ngOnInit() { }

	focusOnInput() {
        //TODO replace this
        document.getElementById('search').focus();
    }

	toggleExampleTag(tag) {
		tag.active = !tag.active;
		if (tag.active) {
			//TODO analytics
		}
		this.tagChangeEmitter.emit();
	}

    inputKeyDown(e) {
        // let Return/Enter key generate a new tag
		if (e.keyCode === 13) {
			let tags = this.userLiveTag.split(' ');
			tags.forEach(tag => {
				this.addTag(tag);
			});
			this.userLiveTag = '';
		}

        // let Backspace when input is empty remove previous tag
		if (e.keyCode === 8 && this.userLiveTag.length === 0) {
			this.removeSelectedTag(this.userCreatedTags.length - 1);
		}
	}

    addTag(tag) {
        // do not add empty or existing tags
		if (tag.length !== 0 && this.userCreatedTags.indexOf(tag) === -1) {
            this.userCreatedTags.push(tag);
			//TODO analytics
		}
	}

    removeSelectedTag(index) {
		this.userCreatedTags.splice(index, 1);
		this.tagChangeEmitter.emit();
	}

    /* Avoid this piece of code, a custom debounced function for this particular use */
	debouncedAnalytics () {
		/* Status 1 occurs when our $timeout exists and has timed out
		 * So whenever it does not exist or hasn't reached its end we re-create it */
		if (!this.debouncedAnalyticsStatus(1)) {
			clearTimeout(this.debouncedAnalyticsRunning);
			this.debouncedAnalyticsRunning = setTimeout(() => {
				if (this.userLiveTag.length > 2) {
					//TODO analytics;
				}
				delete this.debouncedAnalyticsRunning;
			}, this.debouncedAnalyticsDuration, false);
		}
	}

	debouncedAnalyticsStatus(status) {
		return this.debouncedAnalyticsRunning
				&& this.debouncedAnalyticsRunning.$$state.status === status;
	}

    get inputWidth() { // This monster calculates the length of the input element so it breaks line properly
        return 14.5 *  this.userLiveTag.length + 'px';
    }
}