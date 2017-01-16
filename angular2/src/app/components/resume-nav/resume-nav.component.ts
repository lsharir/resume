import { Component, Output, EventEmitter } from '@angular/core';
import { UtilitiesService } from '../../services';

@Component({
    selector: 'resume-nav',
    templateUrl: './resume-nav.component.html',
    styleUrls: ['./resume-nav.component.scss']
})
export class ResumeNavComponent {
    @Output('navigate-out') navigateOut: EventEmitter<any> = new EventEmitter();

    private _sourceCode: string;
    public desktop: Boolean;
    public loadingNg1: Boolean;
    private _ng1Url: string;

    constructor(private utils: UtilitiesService) {
        /** Setting the sourceCode URL */
        this._sourceCode = this.utils.importSourceCodeLink();

        /** Setting the desktop variable to false when user is on mobile*/
		this.desktop = this.utils.isAppRunningOnDesktop();

        /** Setting the angular switch url */
        this._ng1Url = this.utils.importAngularJSUrl();

    }

	printDocument() {
		window.print();
	}
    
    switchAngular() {
        if (!this.loadingNg1) {
            this.navigateOut.emit();
        
            setTimeout(() => {
                window.location.href = this._ng1Url;
            }, 3000);
        }
        
        this.loadingNg1 = true;
	}

    showCode() {
		window.open(this._sourceCode);
    }
}