import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'subjectYears'
})

export class SubjectYearsPipe implements PipeTransform {
    transform(subject: any, args: any[]): any {
        if (!Number.isInteger(subject.start) || !Number.isInteger(subject.end)) {
            return '';
        }

        if (subject.start === subject.end) {
            return subject.start;
        }

        return subject.start + ' - ' + subject.end;
    }
}