import './app.component.scss';

export function AppDirective () {
	return {
		template: require('./app.component.html'),
		controller: AppCtrl,
		controllerAs: '$ctrl'
	};
}

class AppCtrl {
	constructor($scope, SiftService, UtilitiesService) {
		/* Binding injections to our controller */
		this.$scope = $scope;
		this.sift = SiftService;
		this.utils = UtilitiesService;

		/* Setting the desktop variable to false when user is on mobile*/
		this.desktop = this.utils.isAppRunningOnDesktop();

		/* Importing the raw data that the resume consists from */
		this.sourcecode = require('config.js').sourcecode;
		this.contactMethods = this.utils.importContactMethods();
		this.resume = this.utils.importResume();

		/* Sift Service aids us with indexing keywords and re-sorting the data to improve our digestion :) */
		this.sift.indexResume(this.resume);

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
		window.print();
	}

	showCode() {
		window.location.href = this.sourcecode;
	}
}