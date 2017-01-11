import './subject.component.scss';
import { SUBJECT_ANIMATION } from '../../config/animations';

import { 
    Component,
    Input,
    HostBinding
} from '@angular/core';

@Component({
    selector: 'subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss'],
    animations: [ SUBJECT_ANIMATION.trigger ],
    host: {
        '[@inOut]': "'in'"
    }
})
export class SubjectComponent {
    @Input('subject') subject;
    constructor() { }
}