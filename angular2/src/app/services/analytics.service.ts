import { Injectable } from '@angular/core';

@Injectable()
export class AnalyticsService {

    constructor() { }

    contactToggled() {
        console.log('TODO analytics service')
    }

    addTag(tag) {
        console.log('TODO analytics service ' + tag);
    }

    addLiveTag(tag) {
        console.log('TODO analytics service ' + tag);
    }

    addExampleTag(tag) {
        console.log('TODO analytics service ' + tag);
    }
}