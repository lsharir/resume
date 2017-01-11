import './resume-header.component.scss';

export class ResumeHeaderComponent {
    constructor() {
        this.template = require('./resume-header.component.html');
        this.controller = ResumeHeaderController;
        this.bindings = {
            contactMethods: '='
        };
    }
}

class ResumeHeaderController {}