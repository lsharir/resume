import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AnalyticsService } from '../../services';
import { CONTACT_DATA_ANIMATION } from '../../config/animations';

@Component({
    selector: 'contact-details-methods',
    templateUrl: './contact-details-methods.component.html',
    styleUrls: ['./contact-details-methods.component.scss'],
    animations: [ CONTACT_DATA_ANIMATION.trigger ]
})
export class ContactDetailsMethodsComponent {
    @Input('contactMethods') contactMethods;
    @Input('contactMethodsChangeEmitter') contactMethodsEmitter: EventEmitter<any>;
    public noContactMethodSelected: Boolean;

    constructor(private analyticsService: AnalyticsService) {}

    ngOnInit() {
        this.contactMethodsEmitter.subscribe(() => {
            this.updateContactMethodSelectionStatus();
        });
    }

    ngOnDestroy() {
        this.contactMethodsEmitter.unsubscribe();
    }

    contactToggle(contactMethod) {
        contactMethod.toggled = !contactMethod.toggled;
        if (contactMethod.toggled) {
            this.analyticsService.contactToggled();
        }
        this.updateContactMethodSelectionStatus();
    }

    updateContactMethodSelectionStatus() {
        let selection = false;

        this.contactMethods.forEach(contactMethod => {
            selection = selection || contactMethod.toggled || contactMethod.filtered;
        });

        this.noContactMethodSelected = !selection;
    }
}