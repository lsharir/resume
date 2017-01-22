import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services';

@Component({
    selector: 'resume-footer',
    styleUrls: ['./resume-footer.component.scss'],
    templateUrl: './resume-footer.component.html'
})
export class ResumeFooterComponent {
    private _social: any;
    constructor(private utils: UtilitiesService) {
        /** Setting the sourceCode URL */
        this._social = this.utils.importSocialLinks();

    }
    
    googlePlus() {
        window.open(this._social.googlePlus);
    }

    linkedin() {
        window.open(this._social.linkedin);
    }

    facebook() {
        window.open(this._social.facebook);
    }
}