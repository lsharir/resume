import { Injectable } from '@angular/core';

@Injectable()
export class IndexService {
    indexingModule = require('../../../../shared/modules/indexing.module');

    constructor() {}

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