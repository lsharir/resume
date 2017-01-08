import '../../../style/tag.scss';

export class TagComponent {
    constructor() {
        this.template = require('./tag.component.html');
        this.controller = TagController;
        this.controllerAs = '$ctrl';
        this.bindings = {
            text: '=',
            active: '='
        };
    }
}

class TagController {
    constructor($scope) {
        $scope.$watch('$ctrl.active', () => {
            this.randomize();
        });
    }

    randomize() {
        this.randomized = Math.floor((Date.now() % 4000) / 1000);
    }


}