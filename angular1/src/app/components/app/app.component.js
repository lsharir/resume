export function AppDirective () {
	return {
		template: require('./app.component.html'),
		controller: AppCtrl,
		controllerAs: '$ctrl'
	};
}

class AppCtrl {
	constructor($scope, SiftService, $analytics, $timeout) {
		let sift = SiftService;

		/* Binding injections to our controller */
		this.$scope = $scope;
		this.sift = SiftService;
		this.$analytics = $analytics;
		this.$timeout = $timeout;


		/* Setting the desktop variable to false when user is on mobile*/
		this.desktop = !(navigator.userAgent.match(/Android/i)
						|| navigator.userAgent.match(/webOS/i)
						|| navigator.userAgent.match(/iPhone/i)
						|| navigator.userAgent.match(/iPad/i)
						|| navigator.userAgent.match(/iPod/i)
						|| navigator.userAgent.match(/BlackBerry/i)
						|| navigator.userAgent.match(/Windows Phone/i));

		/* Importing the raw data that the resume consists from */
		this.contactMethods = require('methods.js');
		this.rawSubjects = require('subjects.js');
		this.rawCategories = require('categories.js');

		/* Sift Service aids us with indexing keywords and re-sorting the data to improve our digestion :) */
        sift.indexSubjects(this.rawSubjects);
		sift.indexCategories(this.rawCategories);
		this.rawSubjectsByType = sift.subjectsByType(this.rawSubjects);

		/* Array of currently selected tags through free-typing */
		this.userTypedTags = [];
		this.providedExampleTags = require('defaults').map(exampleTagText => {
            return { text: exampleTagText, active: false };
        });

		/* Data is bound to the template, here we set the filtered results of the resume's data */
        this.data = {
			categories: [],
			subjectsByType: []
		};

		/* This is set to false when there are no results after applying the filter */
		this.filteredResultsFound = true;

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

	getTags() {
        let textQuery = this.$scope.query;
		return this.sift.getTags(textQuery, this.userTypedTags, this.providedExampleTags);
	}

	toggleDefault(tag) {
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
		let tags = this.getTags(), // get all the tags
            years = this.sift.getYears(tags), // years queries only
			yearsLength = years.length,
			regularTags = this.sift.getRegularTags(tags), // not years
			filtered = {
				categories: [],
				subjectsByType: []
			},
			filteredResultsFound = false
		;

		this.rawCategories.forEach(category => {
			let categoryMatch = this.sift.categoryTagMatch(category, regularTags);
			filtered.categories.push(category);

            this.rawSubjectsByType[category.type].forEach(subject => {
                let subjectMatch = true;

                subjectMatch = (subjectMatch && this.sift.subjectTagMatch(subject, regularTags) || categoryMatch)
                    && this.sift.inYear(subject, years, yearsLength);

                if (subjectMatch) {
                    this.sift.addSubjectByType(filtered.subjectsByType, subject);
					filteredResultsFound = true;
                }
            });
		});

		this.contactMethods.forEach(contactMethod => {
			if (regularTags.indexOf(contactMethod.icon) !== -1) {
				contactMethod.filtered = true;
				filteredResultsFound = true;
			} else {
				contactMethod.filtered = false;
			}
		});

		this.data = filtered;
		this.filteredResultsFound = filteredResultsFound;
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
}