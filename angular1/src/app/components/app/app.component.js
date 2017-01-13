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

		/* Setting the desktop variable to false when user is on mobile*/
		this.desktop = this.utils.isAppRunningOnDesktop();

		/* Importing the raw data that the resume consists from */
		this.sourcecode = this.utils.importSourcecodeLink();
		this.contactMethods = this.utils.importContactMethods();
		this.resume = this.utils.importResume();

		/* Sift Service aids us with indexing keywords and re-sorting the data to improve our digestion :) */
		this.indexService.indexResume(this.resume);

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
			globalsAdditionalWait = 0,
			exampleTag = { active : true , text : 'AngularJS' },
			animate = angular.noop;

		this.exampleTags.unshift(exampleTag);

		animate = () => {
			this.reveal.execute([
				() => {
					globalsAdditionalWait = Math.max(0, (1000 - (Date.now() - this.$window.loaderStart)));
				},
				this.reveal.waitAndIncrement(globalsAdditionalWait, 0),
				() => {
					this.$window.flipLoader();
					this.documentLoaded = true;
				},
				this.reveal.waitAndIncrement(100, 1),
				this.reveal.waitAndIncrement(600, 1),
				this.reveal.waitAndIncrement(300, 1),
				this.reveal.waitAndIncrement(300, 1),
				this.reveal.waitAndIncrement(1500, 0),
				() => {
					exampleTag.active = false;
					this.changeKeywords([]);
				}
			]);
		}

		globalsAvailabilityChecker = this.$interval(() => {
			if (this.$window.loaderStart && this.$window.flipLoader) {
				this.$interval.cancel(globalsAvailabilityChecker);
				animate();
			}
		}, 100, 0, false);
	}

	changeKeywords(keywords) {
		this.keywords = keywords;
		this.filterResume();
	}

	filterResume() {
		this.data = this.utils.filterResume(this.resume, this.contactMethods, this.keywords);
	}

	printDocument() {
		this.$window.print();
	}

	showCode() {
		this.$window.open(this.sourcecode);
	}

	switchAngular() {
		this.documentLoaded = false;
		this.$window.backToConsole();
		this.$timeout(() => {
			this.$window.location.href = 'http://localhost:4200';
		}, 3000);
	}
}