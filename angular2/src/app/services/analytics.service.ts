import { Injectable, Inject } from '@angular/core';
declare var ga:any;

@Injectable()
export class AnalyticsService {
    constructor() {}

    private _report(fieldsObject) {
        if (!fieldsObject || !fieldsObject.hitType) {
            return;
        }

        if (typeof ga !== 'undefined') {
            ga('send', fieldsObject);
        }
    }

    pageView() {
        this._report({
            hitType: 'pageview'
        });
    }

    contactToggled(contactMethod) {
        this._report({
            hitType: 'event',
            eventCategory: 'contact',
            eventAction: 'contact-method',
            eventLabel: contactMethod.icon
        });
    }

    addTag(tag) {
        this._report({
            hitType: 'event',
            eventCategory: 'tags',
            eventAction: 'tag-added',
            eventLabel: tag
        });
    }

    addLiveTag(tag) {
        this._report({
            hitType: 'event',
            eventCategory: 'live',
            eventAction: 'tag-live',
            eventLabel: tag
        });
    }

    addExampleTag(tag) {
        this._report({
            hitType: 'event',
            eventCategory: 'tags',
            eventAction: 'default-tag-added',
            eventLabel: tag
        });
    }
}