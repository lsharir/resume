import { Component, Input } from '@angular/core';
import { NO_RESULTS_ANIMATION } from '../../config/animations';

@Component({
    selector: 'resume-no-results',
    templateUrl: './resume-no-results.component.html',
    styleUrls: ['./resume-no-results.component.scss'],
    animations: [ NO_RESULTS_ANIMATION.trigger ]
})
export class ResumeNoResultsComponent {
    @Input('noResults') noResults;
    constructor() { }
}