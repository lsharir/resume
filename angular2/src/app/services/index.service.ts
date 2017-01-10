import { Injectable } from '@angular/core';

@Injectable()
export class IndexService {
    constructor() {}

    addSubjectByType(subjectsByTypeArray, subject) {
        if (!subjectsByTypeArray[subject.type] || !subjectsByTypeArray[subject.type].length) {
            subjectsByTypeArray[subject.type] = [];
        }

        subjectsByTypeArray[subject.type].push(subject);
    }

    indexResume(resume) {
        if (!resume || !resume.categories || !resume.subjects) {
            throw new Error('IndexService.indexResume : missing arguments');
        }
        this.indexCategories(resume.categories);
        this.indexSubjects(resume.subjects);

        resume.subjectsByType = this.createSubjectsByType(resume.subjects);;
    }

    indexCategories(categories) {
        categories.forEach(category => {
            category.words = category.title + ' ' + category.tags.join(' ');
            category.words = category.words.toLowerCase();
        });
    }

    indexSubjects(subjects) {
        subjects.forEach(subject => {
            subject.words = subject.title + ' ' +
                subject.description.join(' ') + ' ' +
                subject.tags.join(' ');
            subject.words = subject.words.toLowerCase();
        });
    }

    createSubjectsByType(subjects) {
        let subjectsByType = [];

        subjects.forEach(subject => {
            this.addSubjectByType(subjectsByType, subject);
        });

        return subjectsByType;
    }
}