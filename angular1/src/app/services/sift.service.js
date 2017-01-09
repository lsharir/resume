export class SiftService {
    constructor() {}

    getTagsFromQuery(textQuery, tags, defaults) {
        let textTags = textQuery !== undefined ? textQuery.split(' ') : [],
            validatedTags = [],
            uniqueTags = [];

        textTags.forEach(tag => {
            if (this.validateTag(tag)) {
                validatedTags.push(tag);
            }
        });

        defaults.forEach(tag => {
            if (tag.active) {
                validatedTags.push(tag.text);
            }
        });

        tags = tags.concat(validatedTags);

        tags.forEach(tag => {
            if (uniqueTags.indexOf(tag) === -1) {
                uniqueTags.push(tag.toLowerCase());
            }
        });

        return uniqueTags;
    }

    validateTag(tag) {
        // tags do not contain spaces
        return tag.length !== 0 && tag.indexOf(' ') === -1;
    }

    addSubjectByType(subjectsByTypeArray, subject) {
        if (!subjectsByTypeArray[subject.type] || !subjectsByTypeArray[subject.type].length) {
            subjectsByTypeArray[subject.type] = [];
        }

        subjectsByTypeArray[subject.type].push(subject);
    }

    indexResume(resume) {
        if (!resume || !resume.categories || !resume.subjects) {
            throw new Error('SiftService.indexResume : missing arguments');
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