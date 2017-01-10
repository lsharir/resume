import { Component, OnInit, Input } from '@angular/core';
import { AnalyticsService } from '../../services';

@Component({
    selector: 'contact-details-methods',
    templateUrl: './contact-details-methods.component.html',
    styleUrls: ['./contact-details-methods.component.scss']
})
export class ContactDetailsMethodsComponent {
    @Input('contactMethods') contactMethods;
    constructor(private analyticsService: AnalyticsService) {}

    contactToggle(contactMethod) {
        contactMethod.toggled = !contactMethod.toggled;
        if (contactMethod.toggled) {
            this.analyticsService.contactToggled();
        }
    }
}