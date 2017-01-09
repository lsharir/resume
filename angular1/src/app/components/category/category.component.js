import './category.component.scss';

export class CategoryComponent {
    constructor() {
        this.template = require('./category.component.html');
        this.controller = CategoryController;
        this.bindings = {
            category: '=',
            subjects: '='
        };
    }
}

class CategoryController {}