import './print-contact-details.component.scss';

export class PrintContactDetailsComponent {
    constructor() {
        this.template = require('./print-contact-details.component.html');
        this.controller = PrintContactDetailsCtrl;
        this.bindings = {
            contactDetails: '='
        };
    }
}

class PrintContactDetailsCtrl {}