Liran Sharir's Resume
=========

This repository contains a shared architecture of 2 applications.

One written in [AngularJS][ng1] and the other in [Angular2][ng2].

## Why?

I've started this project when I wanted to compare the performance of both frameworks, on a similar task.
When I realized the differences were not very noticable, I continued comparing additional factors.
Such as animations done in [AngularJS][ng1] compared to [Angular2][ng2].
I also tested various methods to write sharable code and styling between 2 different apps (that define their own components and services).


## Results

In order to create a performance difference, I multiplied the resume entries (which directly affect the amount of content being bound to the DOM).

I then carried a simple, minimized for human error, test, I clicked the '2016' tag, 'email' tag, untoggled '2016', untoggled 'email' - clicks occurred when app was idle. 

Clear painting and scripting improvement were noticable:

![comparison](https://cloud.githubusercontent.com/assets/3345864/21964946/3e1729b4-db5e-11e6-8336-87f74635cb06.jpg)

The full timeline graph of the AngularJS app:

![ng1](https://cloud.githubusercontent.com/assets/3345864/21964963/65d100f6-db5e-11e6-8fa7-e374ddf90c28.png)

The full timeline graph of the Angular2 app:

![ng2](https://cloud.githubusercontent.com/assets/3345864/21964962/65cc1f82-db5e-11e6-8019-d0598bc859bc.png)

## Structure

```shared``` folder contains shared modules, styling and configurations.

Additional information in the ```shared\README.md```

## Build tools
For the AngularJS application I configured a webpack build.

For the Angular2, I tried using angular-cli (due to the simplistic nature of this app).
But think I prefer configuring a webpack build in the future.


[ng2]: http://angular.io
[ng1]: http://angularjs.org