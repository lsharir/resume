import './contact-details-methods.component.scss';

export class ContactDetailsMethodsComponent {
    constructor() {
        this.template = require('./contact-details-methods.component.html');
        this.controller = ContactDetailsMethodsController;
        this.bindings = {
            contactMethods: '='
        };
    }
}

class ContactDetailsMethodsController {
    constructor(AnalyticsService) {
        this.AnalyticsService = AnalyticsService;
    }

    contactToggle(contactMethod) {
		contactMethod.toggled = !contactMethod.toggled;
		if (contactMethod.toggled) {
            this.AnalyticsService.contactToggled(contactMethod);
		}
	}

	contactMethodFilter(contactMethod) {
		return contactMethod.toggled || contactMethod.filtered;
	}
}