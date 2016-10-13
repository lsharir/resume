export function appConfig ($analyticsProvider) {
    $analyticsProvider.virtualPageviews(false);
    $analyticsProvider.firstPageview(true);
    $analyticsProvider.withBase(true); 
}