var Utilities = function () {
    var currentDate = new Date();
    this.currentYear = currentDate.getYear() + 1900;
    this.lowerYearBound = 1988;
    this.config = require('../config.js');
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
    return require('../resume/methods.js');
};

Utilities.prototype.importResume = function() {
    return {
        categories: require('../resume/categories.js'),
        subjects: require('../resume/subjects.js')
    };
};

Utilities.prototype.importAngularJSUrl = function () {
    return this.config.ng1;
}

Utilities.prototype.importAngular2Url = function () {
    return this.config.ng2;
}

Utilities.prototype.importSourceCodeLink = function() {
    return this.config.sourceCode;
};

Utilities.prototype.importExampleTags = function () {
    return this.config.exampleTags.map(function(exampleTagText) {
        return { text: exampleTagText, active: false };
    })
};

Utilities.prototype.getKeywords = function(userLiveTag, userCreatedTags, exampleTags) {
    var self = this,
        userLiveTags = userLiveTag !== undefined ? userLiveTag.split(' ') : [],
        validatedTags = [],
        uniqueTags = [];

    userLiveTags.forEach(function(tag) {
        if (self.validateTag(tag)) {
            validatedTags.push(tag);
        }
    });

    exampleTags.forEach(function(tag) {
        if (tag.active) {
            validatedTags.push(tag.text);
        }
    });

    validatedTags = validatedTags.concat(userCreatedTags);

    validatedTags.forEach(function(tag) {
        if (uniqueTags.indexOf(tag) === -1) {
            uniqueTags.push(tag.toLowerCase());
        }
    });

    return uniqueTags;
};

Utilities.prototype.filterResume = function(resume, contactMethods, tags) {
    var self = this,
        years = getYears(tags),
        keywords = getKeywords(tags),
        results = {
            categories: [],
            subjectsByType: [],
            resultsFound: false
        };

    resume.categories.forEach(function(category) {
        var categoryMatch = categoryTagMatch(category, keywords);

        results.categories.push(category);

        resume.subjectsByType[category.type].forEach(function(subject) {
            var subjectMatch = true;

            subjectMatch = (subjectMatch && subjectTagMatch(subject, keywords) || categoryMatch)
                && subjectYearMatch(subject, years);

            if (subjectMatch) {
                self.addSubjectByType(results.subjectsByType, subject);
                results.resultsFound = true;
            }
        });
    });

    contactMethods.forEach(function(contactMethod) {
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

Utilities.prototype.addSubjectByType = function(subjectsByTypeArray, subject) {
    if (!subjectsByTypeArray[subject.type] || !subjectsByTypeArray[subject.type].length) {
        subjectsByTypeArray[subject.type] = [];
    }

    subjectsByTypeArray[subject.type].push(subject);
};

function categoryTagMatch(category, keywords) {
    var match = true;

    keywords.forEach(function(keyword) {
        match = match && (category.words.search(keyword) !== -1);
    });

    return match;
}

function subjectTagMatch(subject, keywords) {
    var match = true;

    keywords.forEach(function(keyword) {
        match = match && (subject.words.search(keyword) !== -1);
    });

    return match;
}

function subjectYearMatch(subject, years) {
    var i;

    for (i = 0; i < years.length; i++) {
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
    var years = [];

    if (!tags || !tags.length) {
        return years;
    }

    tags.forEach(function(tag) {
        var matches = tag.match(/\b([0-9]{4})\b/g);
        if (matches && matches.length !== 0) {
            years.push(Number(tag));
        }
    });

    return years;
}

function getKeywords(tags) {
    var keywords = [];

    tags.forEach(function(tag) {
        var matches = tag.match(/\b([0-9]{4})\b/g);
        if (!matches) {
            keywords.push(tag);
        }
    });

    return keywords;
}

module.exports = new Utilities();