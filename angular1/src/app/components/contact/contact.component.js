import '../../../style/contact.scss';

export const contact = {
    template: require('./contact.component.html'),
    controller: contactCtrl,
    bindings: {
        contactMethod: '='
    }
}

class contactCtrl {
    constructor () {}
}