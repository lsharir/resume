import '../../../style/tag.scss';

export const tag = {
    template: require('./tag.component.html'),
    controller: tagCtrl,
    controllerAs: '$ctrl',
    bindings: {
        text: '=',
        active: '='
    }
}

function tagCtrl($scope) {
    this.randomize = () => {
        this.randomized = Math.floor((Date.now() % 4000) / 1000);
    };

    $scope.$watch('$ctrl.active', () => {
        this.randomize();
    });
}