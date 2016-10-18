export class SiftService {
    constructor() {
        let thisDate = new Date();
        this.thisYear = thisDate.getYear() + 1900;
        this.bornYear = 1988;
    }

    getTags(textQuery, tags, defaults) {
        let textTags = textQuery !== undefined ? textQuery.split(' ') : [],
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
            // If the year is not a year I existed return false
            if (years[i] > this.thisYear || years[i] < this.bornYear) {
                return false;
            }
            // If the year is not within the range of the subject
            if (subject.start > years[i] || subject.end < years[i]) {
                return false;
            }
        }
        // If the item has no year range, it should return true as it is probably within the range
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