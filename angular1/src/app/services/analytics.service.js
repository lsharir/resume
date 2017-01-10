export class AnalyticsService {
    constructor($analytics) {
        this.$analytics = $analytics;
    }

    contactToggled(contactMethod) {
        this.$analytics.eventTrack('contact-method', { category : 'contact', label: contactMethod.icon });
    }

    addExampleTag(tag) {
        this.$analytics.eventTrack('default-tag-added', { category : 'tags', label: tag });
    }

    addLiveTag(tag) {
        this.$analytics.eventTrack('tag-live', { category : 'live', label: tag });
    }

    addTag(tag) {
        this.$analytics.eventTrack('tag-added', { category : 'tags', label: tag });
    }
}