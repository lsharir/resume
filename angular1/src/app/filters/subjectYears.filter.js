export function subjectYears () {
    return function (subject) {
        if (isNaN(subject.start) || isNaN(subject.end)) {
            return '';
        }
        if (subject.start === subject.end) {
            return subject.start;
        }

        return subject.start + ' - ' + subject.end;
    };
}