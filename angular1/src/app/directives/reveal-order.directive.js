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
            revealState,
            revealFunction

        /** Any reveal-order element is initially hidden */
        element.addClass('reveal-hidden');

        removeListener = reveal.bind((count) => {
            revealFunction(count >= revealOrder);
        });

        revealFunction = (suggestedRevealState) => {
            if (suggestedRevealState && !revealState) {
                scope.$animate.removeClass(element, 'reveal-hidden');
                revealState = true;
            }
            if (!suggestedRevealState && revealState) {
                scope.$animate.addClass(element, 'reveal-hidden');
                revealState = false;
            }
        }

        scope.$on('$destroy', () => {
            removeListener();
        });
    }
}