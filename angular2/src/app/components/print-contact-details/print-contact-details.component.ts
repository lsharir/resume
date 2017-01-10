import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'print-contact-details',
    templateUrl: './print-contact-details.component.html',
    styleUrls: ['./print-contact-details.component.scss']
})
export class PrintContactDetailsComponent implements OnInit {
    @Input('contactDetails') contactDetails;

    constructor() { }

    ngOnInit() { }
}