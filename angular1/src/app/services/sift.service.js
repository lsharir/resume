export class SiftService {
    constructor() {

    }

    getTags(text, tags, defaults) {
        let textTags = text !== undefined ? text.split(' ') : [],
            validatedTags = [];

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

        return tags;
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
}