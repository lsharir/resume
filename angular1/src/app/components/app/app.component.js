export function app () {
	return {
		template: require('./app.component.html'),
		controller: AppCtrl,
		controllerAs: '$ctrl'
	};
}

class AppCtrl {
	constructor($scope, SiftService, $analytics, $timeout) {
		let ctrl = this,
			sift = SiftService;

		this.$scope = $scope;
		this.sift = SiftService;
		this.$analytics = $analytics;
		this.$timeout = $timeout;

		this.contactMethods = require('methods.js');
		this.rawSubjects = require('subjects.js');
		this.rawCategories = require('categories.js');
        sift.indexSubjects(this.rawSubjects);
		sift.indexCategories(this.rawCategories);
		this.rawSubjectsByType = sift.subjectsByType(this.rawSubjects);

		this.selectedTags = [];
		this.defaultTags = require('defaults').map(defaultTag => {
            return { text: defaultTag, active: false };
        });

        this.data = {
			categories: [],
			subjectsByType: []
		};

		$scope.query = '';
		this.debouncedAnalyticsDuration = 1000;
		this.debouncedAnalyticsRunning = undefined;

		$scope.$watch('query', () => {
			let writtenTags = this.$scope.query.split(' '),
				tags;

			if (Array.isArray(writtenTags) && writtenTags.length > 0) {
                // pass every word of input but last to the tags
				for (let i = 0; i < writtenTags.length - 1; i++) {
					this.addTag(writtenTags[i]);
				}

                // leave the remaining last word of input
				this.$scope.query = writtenTags[writtenTags.length - 1];
			}

			this.debouncedAnalytics();
			this.filterResume();
		});

        this.focusOnInput();
	}

	debouncedAnalytics () {
		if (!this.debouncedAnalyticsStatus(1)) { // if timeout has not ended debounce it
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
		if (tag.length !== 0 && this.selectedTags.indexOf(tag) === -1) {
            this.selectedTags.push(tag);
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
			this.removeSelectedTag(this.selectedTags.length - 1);
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
		return this.sift.getTags(textQuery, this.selectedTags, this.defaultTags);
	}

	toggleDefault(tag) {
		tag.active = !tag.active;
		if (tag.active) {
			this.$analytics.eventTrack('default-tag-added', { category : 'tags', label: tag.text });
		}
		this.filterResume();
	}

	removeSelectedTag(index) {
		this.selectedTags.splice(index, 1);
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
			}
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
                }
            });
		});

		this.contactMethods.forEach(contactMethod => {
			if (regularTags.indexOf(contactMethod.icon) !== -1) {
				contactMethod.filtered = true;
			} else {
				contactMethod.filtered = false;
			}
		})

		this.data = filtered;
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
}