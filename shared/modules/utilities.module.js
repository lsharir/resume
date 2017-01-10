var Utilities = function () {
    var currentDate = new Date();
    this.currentYear = currentDate.getYear() + 1900;
    this.lowerYearBound = 1988;
};

Utilities.prototype.isAppRunningOnDesktop = function() {
    return !(navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i))
};

Utilities.prototype.importContactMethods = function() {
    return require('../methods.js');
};

Utilities.prototype.importResume = function() {
    return {
        categories: require('../categories.js'),
        subjects: require('../subjects.js')
    };
};

Utilities.prototype.importExampleTags = function () {
    return require('../defaults.js').map(exampleTagText => {
        return { text: exampleTagText, active: false };
    })
};

Utilities.prototype.getKeywords = function(userLiveTag, userCreatedTags, exampleTags) {
    let userLiveTags = userLiveTag !== undefined ? userLiveTag.split(' ') : [],
        validatedTags = [],
        uniqueTags = [];

    userLiveTags.forEach(tag => {
        if (this.validateTag(tag)) {
            validatedTags.push(tag);
        }
    });

    exampleTags.forEach(tag => {
        if (tag.active) {
            validatedTags.push(tag.text);
        }
    });

    validatedTags = validatedTags.concat(userCreatedTags);

    validatedTags.forEach(tag => {
        if (uniqueTags.indexOf(tag) === -1) {
            uniqueTags.push(tag.toLowerCase());
        }
    });

    return uniqueTags;
};

Utilities.prototype.filterResume = function(resume, contactMethods, tags) {
    var years = getYears(tags),
        keywords = getKeywords(tags),
        results = {
            categories: [],
            subjectsByType: [],
            resultsFound: false
        };

    resume.categories.forEach(category => {
        let categoryMatch = categoryTagMatch(category, keywords);
        results.categories.push(category);

        resume.subjectsByType[category.type].forEach(subject => {
            let subjectMatch = true;

            subjectMatch = (subjectMatch && subjectTagMatch(subject, keywords) || categoryMatch)
                && subjectYearMatch(subject, years);

            if (subjectMatch) {
                addSubjectByType(results.subjectsByType, subject);
                results.resultsFound = true;
            }
        });
    });

    contactMethods.forEach(contactMethod => {
        if (keywords.indexOf(contactMethod.icon) !== -1) {
            contactMethod.filtered = true;
            results.resultsFound = true;
        } else {
            contactMethod.filtered = false;
        }
    });

    return results;
}

Utilities.prototype.validateTag = function(tag) {
    // tags do not contain spaces
    return tag.length !== 0 && tag.indexOf(' ') === -1;
}

Utilities.prototype.originalTag = function(existingTags, tag) {
    return existingTags.indexOf(tag) === -1;
}
function addSubjectByType(subjectsByTypeArray, subject) {
    if (!subjectsByTypeArray[subject.type] || !subjectsByTypeArray[subject.type].length) {
        subjectsByTypeArray[subject.type] = [];
    }

    subjectsByTypeArray[subject.type].push(subject);
}

function categoryTagMatch(category, keywords) {
    let match = true;

    keywords.forEach(keyword => {
        match = match && (category.words.search(keyword) !== -1);
    });

    return match;
}

function subjectTagMatch(subject, keywords) {
    let match = true;

    keywords.forEach(keyword => {
        match = match && (subject.words.search(keyword) !== -1);
    });

    return match;
}

function subjectYearMatch(subject, years) {
    for (let i = 0; i < years.length; i++) {
        // If the year is not a year I existed return false
        if (years[i] > this.currentYear || years[i] < this.lowerYearBound) {
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

getYears = function(tags) {
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

function getKeywords(tags) {
    let keywords = [];

    tags.forEach(tag => {
        let matches = tag.match(/\b([0-9]{4})\b/g);
        if (!matches) {
            keywords.push(tag);
        }
    });

    return keywords;
}

module.exports = new Utilities();