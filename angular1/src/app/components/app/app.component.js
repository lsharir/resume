export function AppDirective () {
	return {
		template: require('./app.component.html'),
		controller: AppCtrl,
		controllerAs: '$ctrl'
	};
}

class AppCtrl {
	constructor($scope, $window, IndexService, UtilitiesService) {
		/* Binding injections to our controller */
		this.$scope = $scope;
		this.$window = $window;
		this.indexService = IndexService;
		this.utils = UtilitiesService;

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

		this.filterResume();
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
}