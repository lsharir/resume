Liran Sharir's Resume
=========

This repository contains a shared architecture of 2 applications.
One written in [AngularJS][ng1] and thet other [Angular2][ng2].

## Structure
Shared filtering and indexing functions are written in ```shared/modules```
The resume entries reside in ```shared/resume```
Component and app wide styling is also shared at ```shared/style```

## Build tools used
For the AngularJS application I configured a webpack build.
For the Angular2, I tried using angular-cli (due to the simplistic nature of this app).
But think I prefer configuring a wepback build in the future.


[ng2] http://angular.io
[ng1] http://angularjs.org