export class RevealOrderDirective {
    constructor() {
        this.restrict = 'A';
    }

    controller($scope, RevealService, $animate) {
        $scope.RevealService = RevealService;
        $scope.$animate = $animate;
    }

    link(scope, element, attrs) {
        let reveal = scope.RevealService,
            revealOrder = Number(attrs['revealOrder']),
            removeListener,
            revealFunction

        /** Any reveal-order element is initially hidden */
        element.addClass('reveal-hidden');

        removeListener = reveal.bind((count) => {
            if (count >= revealOrder) {
                revealFunction();
            }
        });

        revealFunction = () => {
            scope.$animate.removeClass(element, 'reveal-hidden');
            removeListener();
        }

        scope.$on('$destroy', () => {
            removeListener();
        });
    }
}