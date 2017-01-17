import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnalyticsService, UtilitiesService } from '../../services';

@Component({
	selector: 'resume-search',
	templateUrl: './resume-search.component.html',
	styleUrls: ['./resume-search.component.scss']
})
export class ResumeSearchComponent implements OnInit {
	@Input('exampleTags') exampleTags;

	public userLiveTag = '';
	public userCreatedTags = [];

	@Output('keywords') keywordsEmitter: EventEmitter<any> = new EventEmitter();

	/* Private properties that handles our debounced analytics function */
	private debouncedAnalyticsDuration = 1000;
	private debouncedAnalyticsRunning = undefined;

	constructor(
		private analyticsService: AnalyticsService,
		private utils: UtilitiesService
	) { }

	ngOnInit() {
		this.focusOnInput();
	}

	updateKeywords() {
		let keywords = this.utils.getKeywords(this.userLiveTag, this.userCreatedTags, this.exampleTags);
		this.keywordsEmitter.emit({ keywords: keywords });
	}

	userLiveTagChange(value) {
		let writtenTags = value.split(' ');

		if (Array.isArray(writtenTags) && writtenTags.length > 0) {
			/* Pass every word of input but last to the tags */
			for (let i = 0; i < writtenTags.length - 1; i++) {
				this.addTag(writtenTags[i]);
			}

			/* Leave the remaining last word of input */
			this.userLiveTag = writtenTags[writtenTags.length - 1];
		}

		this.updateKeywords();
		this.debouncedAnalytics();
	}

	focusOnInput() {
		//TODO replace this
		document.getElementById('search').focus();
	}

	toggleExampleTag(tag) {
		tag.active = !tag.active;

		if (tag.active) {
			this.analyticsService.addExampleTag(tag.text);
		}

		this.updateKeywords();
	}

	inputKeyDown(e) {
		// let Return/Enter key generate a new tag
		if (e.keyCode === 13) {
			this.addTag(this.userLiveTag);
			this.userLiveTag = '';
			this.updateKeywords();
		}

		// let Backspace when input is empty remove previous tag
		if (e.keyCode === 8 && this.userLiveTag.length === 0) {
			this.removeSelectedTag(this.userCreatedTags.length - 1);
		}
	}

	addTag(tag) {
		if (!this.utils.validateTag(tag) || !this.utils.originalTag(this.userCreatedTags, tag)) {
			return;
		}

		//TODO add example tag dupes handling

		this.userCreatedTags.push(tag);
		this.analyticsService.addTag(tag);
	}

	removeSelectedTag(index) {
		this.userCreatedTags.splice(index, 1);
		this.updateKeywords();
	}

	/* Avoid this piece of code, a custom debounced function for this particular use */
	debouncedAnalytics() {
		/* Status 1 occurs when our $timeout exists and has timed out
		 * So whenever it does not exist or hasn't reached its end we re-create it */
		if (!this.debouncedAnalyticsRunCount(1)) {
			clearTimeout(this.debouncedAnalyticsRunning);
			this.debouncedAnalyticsRunning = setTimeout(() => {
				if (this.userLiveTag.length > 2) {
					this.analyticsService.addLiveTag(this.userLiveTag);
				}
				delete this.debouncedAnalyticsRunning;
			}, this.debouncedAnalyticsDuration, false);
		}
	}

	debouncedAnalyticsRunCount(runCount) {
		/** runCount === 0 when timeout is still running, runCount === 1 when it's done */
		return this.debouncedAnalyticsRunning
			&& this.debouncedAnalyticsRunning.runCount === runCount;
	}

	get inputWidth() { // This monster calculates the length of the input element so it breaks line properly
		return 14.5 * this.userLiveTag.length + 'px';
	}
}