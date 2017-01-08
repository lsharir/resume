import '../../../style/contact.scss';

export class ContactComponent {
    constructor () {
        this.template = require('./contact.component.html');
        this.controller = ContactController;
        this.bindings = {
            contactMethod: '='
        }
    }
}

class ContactController {}