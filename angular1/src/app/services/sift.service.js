export class SiftService {
    constructor() {

    }

    getTags(text, tags, defaults) {
        let textTags = text !== undefined ? text.split(' ') : [],
            validatedTags = [],
            uniqueTags = [];

        textTags.forEach(tag => {
            if (this.validateTag(tag)) {
                validatedTags.push(tag);
            }
        })

        defaults.forEach(tag => {
            if (tag.active) {
                validatedTags.push(tag.text);
            }
        });

        tags = validatedTags.concat(tags);

        tags.forEach(tag => {
            if (uniqueTags.indexOf(tag) === -1) {
                uniqueTags.push(tag);
            }
        });

        return uniqueTags;
    }

    validateTag(tag) {
        return tag.length !== 0 && tag.indexOf(' ') === -1;
    }

    getYears(tags) {
        let years = [];

        if (!tags || !tags.length) {
            return years;
        }

        tags.forEach(tag => {
            let matches = tag.match(/\b([0-9]{4})\b/g);
            if (matches && matches.length !== 0) {
                years.push(Number(tag));
            }
        });

        return years;
    }

    getRegularTags(tags) {
        let regular = [];

        tags.forEach(tag => {
            let matches = tag.match(/\b([0-9]{4})\b/g);
            if (!matches) {
                regular.push(tag);
            }
        });

        return regular;
    }

    inYear(subject, years, yearsLength) {
        for (let i = 0; i < yearsLength; i++) {
            if (subject.start > years[i] || subject.end < years[i]) {
                return false;
            }
        }
        return true;
    }

    addSubjectByType(subjectsByTypeArray, subject) {
        if (!subjectsByTypeArray[subject.type] || !subjectsByTypeArray[subject.type].length) {
            subjectsByTypeArray[subject.type] = [];
        }

        subjectsByTypeArray[subject.type].push(subject);
    }

    indexCategories(categories) {
        categories.forEach(category => {
            category.words = category.title + ' ' + category.tags.join(' ');
        });
    }

    indexSubjects(subjects) {
        subjects.forEach(subject => {
            subject.words = subject.title + ' ' +
                subject.description.join(' ') + ' ' +
                subject.tags.join(' ');
        });
    }

    subjectsByType(subjects) {
        let subjectsByType = [];

        subjects.forEach(subject => {
            this.addSubjectByType(subjectsByType, subject);
        });

        return subjectsByType;
    }

    categoryTagMatch(category, tags) {
        // tags here are only keywords, not years
        let match = true;

        tags.forEach(tag => {
            match = match && (category.words.search(tag) !== -1);
        });

        return match;
    }

    subjectTagMatch(subject, tags) {
        // tags here are only keywords, not years
        let match = true;

        tags.forEach(tag => {
            match = match && (subject.words.search(tag) !== -1);
        });

        return match;
    }
}