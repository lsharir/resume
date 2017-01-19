function getCode() {
    return "angular.module(MODULE_NAME, [\n\u0009\u0009require('angular-animate'),\n\u0009\u0009require('angulartics'),\n\u0009\u0009require('angulartics-google-analytics')\n\u0009])\n\u0009.component('appRoot', new AppComponent)\n\u0009.component('resumeSearch', new ResumeSearchComponent)\n\u0009.component('resumeHeader', new ResumeHeaderComponent)\n\u0009.component('resumeNoResults', new ResumeNoResultsComponent)\n\u0009.component('category', new CategoryComponent)\n\u0009.component('subject', new SubjectComponent)\n\u0009.component('tag', new TagComponent)\n\u0009.component('printContactDetails', new PrintContactDetailsComponent)\n\u0009.component('contactDetailsMethods', new ContactDetailsMethodsComponent)\n\u0009.directive('revealOrder', () => new RevealOrderDirective)\n\u0009.filter('subjectYears', subjectYears)\n\u0009.service('IndexService', IndexService)\n\u0009.service('UtilitiesService', UtilitiesService)\n\u0009.service('AnalyticsService', AnalyticsService)\n\u0009.service('RevealService', RevealService)\n\u0009.config(appConfig)\n\u0009;"
}

function getExitCode() {
    return 'Please hold\n\n$scope.$on("$destroy") {\n   $window.location.href = "ng2.lsharir.com";\n});';
}

function getPreloadBS() {
    return [
        '\n\nConnection established',
        '\n\nRequesting files...',
        '\n\nImporting directives...',
        '\n\nInitiating root scope...',
        '\n\nParsing template...',
        '\n\nEngaging the flux capacitor...',
        '\n\nReceiving packets...',
        '\n\nEnhancing web experience...',
        '\n\nLoading assets...',
        '\n\nApplication ready to bootstrap!'
    ];
}