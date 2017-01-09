export class UtilitiesService {
    constructor() {
        this.utilities = require('modules/utilities.module');
    }

    isAppRunningOnDesktop() {
        return this.utilities.isAppRunningOnDesktop();
    }

    /** Filter Resume returns an objected with the filtered resume data as so:
     * {
     *  categories: [],
     *  subjectsByType: []
     *  resultsFound: Boolean
     * }
     */
    filterResume(resume, contactMethods, tags) {
        return this.utilities.filterResume(resume, contactMethods, tags);
    }

    /** imports the hardcoded data of the resume */
    importResume() {
        return this.utilities.importResume();
    }

    /** imports the hardcoded data of the contact details */
    importContactMethods() {
        return this.utilities.importContactMethods();
    }
}