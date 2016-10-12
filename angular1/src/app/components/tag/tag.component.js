import '../../../style/tag.scss';

export const tag = {
    template: require('./tag.component.html'),
    controller: tagCtrl,
    bindings: {
        text: '=',
        active: '='
    }
}

class tagCtrl {
    constructor () {}
}