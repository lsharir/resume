export function subjectYears () {
    return function (subject) {
        if (!Number.isInteger(subject.start) || !Number.isInteger(subject.end)) {
            return '';
        }

        if (subject.start === subject.end) {
            return subject.start;
        }

        return subject.start + ' - ' + subject.end;
    };
}