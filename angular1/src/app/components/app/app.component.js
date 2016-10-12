export function app () {
	return {
		template: require('./app.component.html'),
		controller: AppCtrl,
		controllerAs: '$ctrl'
	};
}

class AppCtrl {
	constructor($scope, SiftService) {
		let ctrl = this,
			sift = SiftService;

		this.$scope = $scope;
		this.sift = SiftService;

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

			this.filterResume();
		});

        this.focusOnInput();
	}

	addTag(tag) {
        // do not add empty or existing tags
		if (tag.length !== 0 && this.selectedTags.indexOf(tag) === -1) {
            this.selectedTags.push(tag);
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

		this.data = filtered;
	};
}