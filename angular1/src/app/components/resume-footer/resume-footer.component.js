import './resume-footer.component.scss';

export class ResumeFooterComponent {
    constructor() {
        this.template = require('./resume-footer.component.html');
        this.controller = ResumeFooterController;
    }
}

class ResumeFooterController {
    constructor($window, $timeout, UtilitiesService) {
        this.$window = $window;
        this.utils = UtilitiesService;
        this._social = UtilitiesService.importSocialLinks();
    }

    googlePlus() {
        this.$window.open(this._social.googlePlus);
    }

    linkedin() {
        this.$window.open(this._social.linkedin);
    }

    facebook() {
        this.$window.open(this._social.facebook);
    }
}