import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {
    utilsModule = require('../../../../shared/modules/utilities.module');
    
    constructor() {}

    isAppRunningOnDesktop() {
        return this.utilsModule.isAppRunningOnDesktop();
    }

    /** Filter Resume returns an objected with the filtered resume data */
    filterResume(resume, contactMethods, tags) {
        return this.utilsModule.filterResume(resume, contactMethods, tags);
    }

    importSocialLinks() {
        return this.utilsModule.importSocialLinks();
    }

    /** import the sourceCode link */
    importSourceCodeLink() {
        return this.utilsModule.importSourceCodeLink();
    }

    importAngular2Url() {
        return this.utilsModule.importAngular2Url();
    }

    importAngularJSUrl() {
        return this.utilsModule.importAngularJSUrl();
    }
    

    /** imports the hardcoded data of the resume */
    importResume() {
        return this.utilsModule.importResume();
    }

    /** imports the hardcoded data of the contact details */
    importContactMethods() {
        return this.utilsModule.importContactMethods();
    }

    /** imports the example tags provided below the search bar */
    importExampleTags() {
        return this.utilsModule.importExampleTags();
    }

    /** returns an array of keywords from a live text in the query, example tags and other that exist */
    getKeywords(userLiveTag, userCreatedTags, exampleTags) {
        return this.utilsModule.getKeywords(userLiveTag, userCreatedTags, exampleTags);
    }

    /** validates the format of the tag */
    validateTag(tag) {
        return this.utilsModule.validateTag(tag);
    }

    /** returns true if tag doesnt already exist in array */
    originalTag(existingTags, tag) {
        return this.utilsModule.originalTag(existingTags, tag);
    }
}