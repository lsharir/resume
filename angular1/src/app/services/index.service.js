export class IndexService {
    constructor() {
        this.indexingModule = require('modules/indexing.module');
    }

    indexResume(resume) {
        this.indexingModule.indexResume(resume);
    }

    indexCategories(categories) {
        this.indexingModule.indexCategories(categories);
    }

    indexSubjects(subjects) {
        this.indexingModule.indexSubjects(subjects);
    }
}