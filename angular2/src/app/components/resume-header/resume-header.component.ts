import { Component, Input } from '@angular/core';

@Component({
    selector: 'resume-header',
    templateUrl: './resume-header.component.html',
    styleUrls: ['./resume-header.component.scss']
})
export class ResumeHeaderComponent {
    @Input('contactMethods') contactMethods;
    constructor() { }
}