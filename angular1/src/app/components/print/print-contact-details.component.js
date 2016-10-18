import '../../../style/print-contact-details.scss';

export const printContactDetails = {
    template: require('./print-contact-details.component.html'),
    controller: printContactDetailsCtrl,
    bindings: {
        contactDetails: '='
    }
}

class printContactDetailsCtrl {
    constructor () {}
}