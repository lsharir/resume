var Clipboard = require('clipboard');

export class InitClipboardDirective {
    constructor() {
        this.restrict = 'A';
    }

    controller($timeout) {
        let momentarilyClassy;
        this.$timeout = $timeout;

        this.momentarilyClassy = (element, className) => {
            element.addClass(className);
            this.$timeout(() => {
                element.removeClass(className);
            }, 2000, false);
        };
    }

    link(scope, element, attrs, ctrl) {
        let clipboard = new Clipboard(element[0]);

        clipboard.on('success', function (e) {
            e.clearSelection();
            ctrl.momentarilyClassy(element, 'copied');
        });

        clipboard.on('error', function (e) {
            ctrl.momentarilyClassy(element, 'copied');
        });

        scope.$on('$destroy', () => {
            clipboard.destroy();
        });
    }
}