import '../../../style/category.scss';

export const category = {
    template: require('./category.component.html'),
    controller: categoryCtrl,
    bindings: {
        category: '=',
        subjects: '='
    }
}

class categoryCtrl {
    constructor () {}
}