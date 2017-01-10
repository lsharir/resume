import { ContactMethodFilterPipe, ContactMethodsFilterCountPipe } from './contact-method-filter.filter';
import { SubjectYearsPipe } from './subject-years.pipe';

export const FILTERS = [
    ContactMethodFilterPipe,
    ContactMethodsFilterCountPipe,
    SubjectYearsPipe
];