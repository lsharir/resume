import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'contactMethodFilter'
})

export class ContactMethodFilterPipe implements PipeTransform {
    transform(contactMethod: any, args: any[]): any {
        return contactMethod.toggled || contactMethod.filtered;
    }
}

@Pipe({
    name: 'contactMethodsFilterCount'
})

export class ContactMethodsFilterCountPipe implements PipeTransform {
    transform(contactMethods: any[], args: any[]): any {
        let count = 0;
        contactMethods.forEach(contactMethod => {
            count += contactMethod.toggled || contactMethod.filtered ? 1 : 0;
        });
        return count;
    }
}