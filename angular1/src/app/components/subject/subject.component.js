import './subject.component.scss';

export class SubjectComponent {
    constructor() {
        this.template = require('./subject.component.html');
        this.controller = SubjectController;
        this.bindings = {
            subject: '='
        };
    }
}

class SubjectController {}