import './resume-no-results.component.scss';

export class ResumeNoResultsComponent {
    constructor() {
        this.template = require('./resume-no-results.component.html');
        this.controller = ResumeNoResultsController;
        this.bindings = {
            noResults: '='
        };
    }
}

class ResumeNoResultsController {}