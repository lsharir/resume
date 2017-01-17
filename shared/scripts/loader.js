window._flipApp = function(app, frontToBack, options) {
    var flipAppAnimation,
        fromAngle = frontToBack ? '0deg' : '180deg',
        toAngle = frontToBack ? '-180deg' : '0deg',
        fromTransform = 'rotate3d(0,1,0,' + fromAngle + ')',
        toTransform = 'rotate3d(0,1,0,' + toAngle + ')';

    if (!options || !options.duration || !options.easing) {
        throw Error('flipApp: missing parameters');
    }

    if (frontToBack) {
        setTimeout(function() {
            app.classList.add('app-concealed');
        }, options.duration);
    } else {
        app.classList.remove('app-concealed');
    }
    
    flipAppAnimation = app.animate([
        { transform : fromTransform },
        { transform : toTransform }
    ], {
        duration: options.duration,
        easing: options.easing
    });

    app.style.setProperty('transform', toTransform);
};

window._flipConsole = function(loader, frontToBack, options) {
    var flipAnimation, maxWidthAnimation,
        maxWidthDelay, maxWidthDuration = 1000,
        fromAngle, toAngle, fromMaxWidth, toMaxWidth, fromTransform, toTransform;

    if (!options || !options.duration || !options.easing) {
        throw Error('flipConsole: missing parameters');
    }

    if (frontToBack) {
        fromAngle = '0deg';
        toAngle = '-180deg';
        fromMaxWidth = window.innerWidth + 'px';
        toMaxWidth = '66.5rem';
        maxWidthDelay = 0;

        document.body.classList.remove('no-margin');
    } else {
        fromAngle = '180deg';
        toAngle = '0deg';
        fromMaxWidth = '66.5rem';
        toMaxWidth = window.innerWidth + 'px';
        maxWidthDelay = 1500;

        setTimeout(function () {
            document.body.classList.add('no-margin');
        }, 2000);
    }
    
    fromTransform = 'rotate3d(0,1,0,' + fromAngle + ') translate3d(0,0,10px)';
    toTransform = 'rotate3d(0,1,0,' + toAngle + ') translate3d(0,0,10px)';

    maxWidthAnimation = loader.animate([
        { maxWidth : fromMaxWidth },
        { maxWidth : toMaxWidth }
    ], {
        duration: maxWidthDuration,
        delay: maxWidthDelay,
        fill: 'forwards',
        easing: 'ease-in-out'
    });

    flipAnimation = loader.animate([
        { transform : fromTransform },
        { transform : toTransform }
    ], {
        duration: options.duration,
        easing: options.easing
    });

    loader.style.setProperty('transform', toTransform);
};