import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {
    utilities = require('../../../../shared/modules/utilities.module');
    constructor() {}

    isAppRunningOnDesktop() {
        return this.utilities.isAppRunningOnDesktop();
    }

    /** Filter Resume returns an objected with the filtered resume data */
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

    /** imports the example tags provided below the search bar */
    importExampleTags() {
        return this.utilities.importExampleTags();
    }
}