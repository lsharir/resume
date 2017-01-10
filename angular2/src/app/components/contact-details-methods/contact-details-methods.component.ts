import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'contact-details-methods',
    templateUrl: './contact-details-methods.component.html',
    styleUrls: ['./contact-details-methods.component.scss']
})
export class ContactDetailsMethodsComponent {
    @Input('contactMethods') contactMethods;
    constructor() {}

    contactToggle(contactMethod) {
        contactMethod.toggled = !contactMethod.toggled;

        //TODO analytics
    }
}