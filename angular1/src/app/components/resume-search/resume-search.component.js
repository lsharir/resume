import './resume-search.component.scss';

export class ResumeSearchComponent {
    constructor () {
        this.template = require('./resume-search.component.html');
        this.controller = ResumeSearchController;
        this.controllerAs = '$search',
        this.bindings = {
            userLiveTag: '=',
            userCreatedTags: '=',
            exampleTags: '=',
            tagChangeHandler: '&'
        }
    }
}

class ResumeSearchController {
    constructor($scope, $analytics, $timeout) {
        this.$scope = $scope;
        this.$analytics = $analytics;
        this.$timeout = $timeout;

        /** initializing the query string */
        this.userLiveTag = '';

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

			/* After handling the tags the user wrote down, and after calling the filterResume method,
			 * We call our debounced analytics data (to record partial queries) */
			this.tagChangeHandler();

			this.debouncedAnalytics();
		});

        this.focusOnInput();
    }

    focusOnInput() {
        //TODO replace this
        document.getElementById('search').focus();
    }

	toggleExampleTag(tag) {
		tag.active = !tag.active;
		if (tag.active) {
			this.$analytics.eventTrack('default-tag-added', { category : 'tags', label: tag.text });
		}
		this.tagChangeHandler();
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
			this.$analytics.eventTrack('tag-added', { category : 'tags', label: tag });
		}
	}

    removeSelectedTag(index) {
		this.userCreatedTags.splice(index, 1);
		this.tagChangeHandler();
	}

    /* Avoid this piece of code, a custom debounced function for this particular use */
	debouncedAnalytics () {
		/* Status 1 occurs when our $timeout exists and has timed out
		 * So whenever it does not exist or hasn't reached its end we re-create it */
		if (!this.debouncedAnalyticsStatus(1)) {
			this.$timeout.cancel(this.debouncedAnalyticsRunning);
			this.debouncedAnalyticsRunning = this.$timeout(() => {
				if (this.userLiveTag.length > 2) {
					this.$analytics.eventTrack('tag-live', { category : 'live', label: this.userLiveTag });
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