import './resume-search.component.scss';

export class ResumeSearchComponent {
    constructor () {
        this.template = require('./resume-search.component.html');
        this.controller = ResumeSearchController;
        this.controllerAs = '$search',
        this.bindings = {
            exampleTags: '=',
            keywordsEmitter: '&'
        }
    }
}

class ResumeSearchController {
    constructor($scope, AnalyticsService, UtilitiesService, $timeout) {
        this.$scope = $scope;
        this.analyticsService = AnalyticsService;
		this.utils = UtilitiesService;
        this.$timeout = $timeout;

        /** initializing the query string */
        this.userLiveTag = '';
		this.userCreatedTags = [];

        /* Private properties that handles our debounced analytics function */
		this.debouncedAnalyticsDuration = 1000;
		this.debouncedAnalyticsRunning = undefined;

        $scope.$watch('$search.userLiveTag', () => {
			let writtenTags = this.userLiveTag.split(' ');

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
		});

        this.focusOnInput();
    }

	updateKeywords() {
		let keywords = this.utils.getKeywords(this.userLiveTag, this.userCreatedTags, this.exampleTags);
		this.keywordsEmitter({ keywords : keywords });
	}

    focusOnInput() {
        //TODO replace this shit
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
	debouncedAnalytics () {
		/* Status 1 occurs when our $timeout exists and has timed out
		 * So whenever it does not exist or hasn't reached its end we re-create it */
		if (!this.debouncedAnalyticsStatus(1)) {
			this.$timeout.cancel(this.debouncedAnalyticsRunning);
			this.debouncedAnalyticsRunning = this.$timeout(() => {
				if (this.userLiveTag.length > 2) {
					this.analyticsService.addLiveTag(this.userLiveTag);
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