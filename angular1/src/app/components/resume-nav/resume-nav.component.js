import './resume-nav.component.scss';

export class ResumeNavComponent {
    constructor() {
        this.template = require('./resume-nav.component.html');
        this.controller = ResumeNavController;
        this.bindings = {
            flipApp: '&'
        }
    }
}

class ResumeNavController {
    constructor($window, $timeout, UtilitiesService) {
        this.$window = $window;
        this.$timeout = $timeout;
        this.utils = UtilitiesService;

        /** Setting the sourceCode URL */
        this.sourceCode = this.utils.importSourceCodeLink();

        /** Setting the desktop variable to false when user is on mobile*/
		this.desktop = this.utils.isAppRunningOnDesktop();
    }

	printDocument() {
		this.$window.print();
	}
    
    switchAngular() {
        if (!this.loadingNg2) {
            this.flipApp();
        }

        this.loadingNg2 = true;
	}

    showCode() {
		this.$window.open(this.sourceCode);
    }
}