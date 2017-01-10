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

		/* Array of currently selected tags through free-typing */
		this.userLiveTag = '';
		this.userCreatedTags = []
		this.exampleTags = this.utils.importExampleTags();

		/* Data is bound to the template, here we set the filtered results of the resume's data */
        this.data = {
			categories: [],
			subjectsByType: [],
			resultsFound: false
		};

		this.filterResume();
	}

	tagChangeHandler() {
		this.filterResume();
	}

	filterResume() {
		let tags = this.sift.getAllTags(this.userLiveTag, this.userCreatedTags, this.exampleTags);
		this.data = this.utils.filterResume(this.resume, this.contactMethods, tags);
	}

	printDocument() {
		window.print();
	}

	showCode() {
		window.location.href = this.sourcecode;
	}
}