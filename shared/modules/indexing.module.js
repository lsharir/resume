var Indexing = function() {
    this.utils = require('./utilities.module');
};

Indexing.prototype.indexResume = function(resume) {
    if (!resume || !resume.categories || !resume.subjects) {
        throw new Error('IndexService.indexResume : missing arguments');
    }
    this.indexCategories(resume.categories);
    this.indexSubjects(resume.subjects);

    resume.subjectsByType = this.createSubjectsByType(resume.subjects);;
};

Indexing.prototype.indexCategories = function(categories) {
    categories.forEach(function(category) {
        category.words = category.title + ' ' + category.tags.join(' ');
        category.words = category.words.toLowerCase();
    });
};

Indexing.prototype.indexSubjects = function(subjects) {
    subjects.forEach(function(subject) {
        subject.words = subject.title + ' ' +
            subject.description.join(' ') + ' ' +
            subject.tags.join(' ');
        subject.words = subject.words.toLowerCase();
    });
};

Indexing.prototype.createSubjectsByType = function(subjects) {
    var self = this,
        subjectsByType = [];

    subjects.forEach(function(subject) {
        self.utils.addSubjectByType(subjectsByType, subject);
    });

    return subjectsByType;
}

module.exports = new Indexing();