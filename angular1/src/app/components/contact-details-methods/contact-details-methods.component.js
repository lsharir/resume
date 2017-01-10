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
    constructor($analytics) {
        this.$analytics = $analytics;
    }

    contactToggle(contactMethod) {
		contactMethod.toggled = !contactMethod.toggled;
		if (contactMethod.toggled) {
			this.$analytics.eventTrack('contact-method', { category : 'contact', label: contactMethod.icon });
		}
	}

	contactMethodFilter(contactMethod) {
		return contactMethod.toggled || contactMethod.filtered;
	}
}