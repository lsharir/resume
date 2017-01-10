export class UtilitiesService {
    constructor() {
        this.utilsModule = require('modules/utilities.module');
    }

    isAppRunningOnDesktop() {
        return this.utilsModule.isAppRunningOnDesktop();
    }

    /** Filter Resume returns an objected with the filtered resume data */
    filterResume(resume, contactMethods, tags) {
        return this.utilsModule.filterResume(resume, contactMethods, tags);
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