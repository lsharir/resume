export function AppDirective () {
	return {
		template: require('./app.component.html'),
		controller: AppCtrl,
		controllerAs: '$ctrl'
	};
}

class AppCtrl {
	constructor($scope, SiftService, UtilitiesService, $analytics, $timeout) {
		/* Binding injections to our controller */
		this.$scope = $scope;
		this.sift = SiftService;
		this.utils = UtilitiesService;
		this.$analytics = $analytics;
		this.$timeout = $timeout;

		/* Setting the desktop variable to false when user is on mobile*/
		this.desktop = this.utils.isAppRunningOnDesktop();

		/* Importing the raw data that the resume consists from */
		this.sourcecode = require('config.js').sourcecode;
		this.contactMethods = this.utils.importContactMethods();
		this.resume = this.utils.importResume();

		/* Sift Service aids us with indexing keywords and re-sorting the data to improve our digestion :) */
		this.sift.indexResume(this.resume);

		/* Array of currently selected tags through free-typing */
		this.userTypedTags = [];
		this.providedExampleTags = require('defaults').map(exampleTagText => {
            return { text: exampleTagText, active: false };
        });

		/* Data is bound to the template, here we set the filtered results of the resume's data */
        this.data = {
			categories: [],
			subjectsByType: [],
			resultsFound: true
		};

		/* Setting the loaded query to an empty string */
		$scope.query = '';

		/* Private properties that handles our debounced analytics function */
		this.debouncedAnalyticsDuration = 1000;
		this.debouncedAnalyticsRunning = undefined;

		/* We set the query watch to handle input changes and filter the resume */
		$scope.$watch('query', () => {
			let writtenTags = this.$scope.query.split(' ');

			if (Array.isArray(writtenTags) && writtenTags.length > 0) {
                /* Pass every word of input but last to the tags */
				for (let i = 0; i < writtenTags.length - 1; i++) {
					this.addTag(writtenTags[i]);
				}

                /* Leave the remaining last word of input */
				this.$scope.query = writtenTags[writtenTags.length - 1];
			}

			/* After handling the tags the user wrote down, and after calling the filterResume method,
			 * We call our debounced analytics data (to record partial queries) */
			this.filterResume();
			this.debouncedAnalytics();
		});

		/* Our controller asks the page to focus on the search container when it is loaded */
        this.focusOnInput();
	}

	/* Avoid this piece of code, a custom debounced function for this particular use */
	debouncedAnalytics () {
		/* Status 1 occurs when our $timeout exists and has timed out
		 * So whenever it does not exist or hasn't reached its end we re-create it */
		if (!this.debouncedAnalyticsStatus(1)) {
			this.$timeout.cancel(this.debouncedAnalyticsRunning);
			this.debouncedAnalyticsRunning = this.$timeout(() => {
				if (this.$scope.query.length > 2) {
					this.$analytics.eventTrack('tag-live', { category : 'live', label: this.$scope.query });
				}
				delete this.debouncedAnalyticsRunning;
			}, this.debouncedAnalyticsDuration, false);
		}
	}

	debouncedAnalyticsStatus(status) {
		return this.debouncedAnalyticsRunning
				&& this.debouncedAnalyticsRunning.$$state.status === status;
	}

	addTag(tag) {
        // do not add empty or existing tags
		if (tag.length !== 0 && this.userTypedTags.indexOf(tag) === -1) {
            this.userTypedTags.push(tag);
			this.$analytics.eventTrack('tag-added', { category : 'tags', label: tag });
		}
	}

	inputKeyDown(e) {
        // let Return/Enter key generate a new tag
		if (e.keyCode === 13) {
			let tags = this.$scope.query.split(' ');
			tags.forEach(tag => {
				this.addTag(tag);
			});
			this.$scope.query = '';
		}

        // let Backspace when input is empty remove previous tag
		if (e.keyCode === 8 && this.$scope.query.length === 0) {
			this.removeSelectedTag(this.userTypedTags.length - 1);
		}
	}

	focusOnInput() {
		document.getElementById('search').focus();
	}

    get inputWidth() { // This monster calculates the length of the input element so it breaks line properly
        let textQuery = this.$scope.query.length;
        return 14.5 *  textQuery + 'px';
    }

	getTagsFromQuery() {
        let textQuery = this.$scope.query;
		return this.sift.getTagsFromQuery(textQuery, this.userTypedTags, this.providedExampleTags);
	}

	toggleDefaultTag(tag) {
		tag.active = !tag.active;
		if (tag.active) {
			this.$analytics.eventTrack('default-tag-added', { category : 'tags', label: tag.text });
		}
		this.filterResume();
	}

	removeSelectedTag(index) {
		this.userTypedTags.splice(index, 1);
		this.filterResume();
	}

	filterResume() {
		let tags = this.getTagsFromQuery();
		this.data = this.utils.filterResume(this.resume, this.contactMethods, tags);
	}

	contactToggle(cMethod) {
		cMethod.toggled = !cMethod.toggled;
		if (cMethod.toggled) {
			this.$analytics.eventTrack('contact-method', { category : 'contact', label: cMethod.icon });
		}
	}

	contactMethodFilter(cMethod) {
		return cMethod.toggled || cMethod.filtered;
	}

	printDocument() {
		window.print();
	}

	showCode() {
		window.location.href = this.sourcecode;
	}
}