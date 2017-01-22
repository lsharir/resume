export function AppComponent () {
	return {
		template: require('./app.component.html'),
		controller: AppCtrl,
		controllerAs: '$ctrl'
	};
}

class AppCtrl {
	constructor(
		$scope,
		$timeout,
		$interval, 
		$window, 
		RevealService, 
		IndexService, 
		UtilitiesService
	) {
		/* Binding injections to our controller */
		this.$scope = $scope;
		this.$window = $window;
		this.$interval = $interval;
		this.$timeout = $timeout;
		this.indexService = IndexService;
		this.utils = UtilitiesService;
		this.reveal = RevealService;

		/* Importing the raw data that the resume consists from */
		this.contactMethods = this.utils.importContactMethods();
		this.resume = this.utils.importResume();

		/* Sift Service aids us with indexing keywords and re-sorting the data to improve our digestion :) */
		this.indexService.indexResume(this.resume);

        /** Setting the angular switch url */
        this.ng2Url = this.utils.importAngular2Url();

		/* Importing the example tags */
		this.exampleTags = this.utils.importExampleTags();

		/** initializing the keywords array */
		this.keywords = [];

		/* Data is bound to the template, here we set the filtered results of the resume's data */
        this.data = {
			categories: [],
			subjectsByType: [],
			resultsFound: false
		};

		this.animationSequence();
	}

	animationSequence() {
		let globalsAvailabilityChecker = angular.noop,
			exampleTag = { active : false , text : 'AngularJS' },
			animate = angular.noop;

		this.exampleTags.unshift(exampleTag);

		animate = () => {
			this.reveal.execute([
				this.reveal.waitAndIncrement(300, 0),
				() => {
					this.$window.flipLoader();
					this.changeKeywords(['UNDEFINED']);
				},
				this.reveal.waitAndIncrement(100, 1),
				this.reveal.waitAndIncrement(600, 1),
				this.reveal.waitAndIncrement(300, 1),
				this.reveal.waitAndIncrement(300, 1),
				this.reveal.waitAndIncrement(3000, 1),
				() => {
					exampleTag.active = true;
					this.changeKeywords(['angularjs']);
				},
				this.reveal.waitAndIncrement(2000, 0),
				() => {
					exampleTag.active = false;
					this.changeKeywords([]);
				},
				this.reveal.waitAndIncrement(300, 1)
			]);
		}

		globalsAvailabilityChecker = this.$interval(() => {
			if (this.$window.flipLoader) {
				this.$interval.cancel(globalsAvailabilityChecker);
				animate();
			}
		}, 100, 0, false);
	}

	flipApp() {
		let animate;

		animate = () => {
			this.reveal.execute([
				() => {
					this.$window.backToConsole();
				},
				this.reveal.waitAndIncrement(1000, -1),
				this.reveal.waitAndIncrement(300, -1),
				this.reveal.waitAndIncrement(300, -1),
				this.reveal.waitAndIncrement(300, -1),
				this.reveal.waitAndIncrement(300, -2),
				this.reveal.waitAndIncrement(300, 0),
				() => {
					this.$window.location.href = this.ng2Url;
				}
			])
		}

		animate();
	}

	changeKeywords(keywords) {
		this.keywords = keywords;
		this.filterResume();
	}

	filterResume() {
		this.data = this.utils.filterResume(this.resume, this.contactMethods, this.keywords);
	}
}