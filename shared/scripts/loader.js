window._flipApp = function(app, frontToBack, options) {
    var animation,
        fromAngle = frontToBack ? '0deg' : '180deg',
        toAngle = frontToBack ? '-180deg' : '0deg',
        fromTransform = 'rotate3d(0,1,0,' + fromAngle + ')',
        toTransform = 'rotate3d(0,1,0,' + toAngle + ')';

    if (!options || !options.duration || !options.easing) {
        throw Error('flipApp: missing parameters');
    }

    if (frontToBack) {
        app.animate([
            { opacity : 1 },
            { opacity : 0 }
        ], {
            duration : options.duration,
            easing: options.easing
        });

        app.style.setProperty('opacity', 0);
    } else {
        app.classList.remove('concealed');
    }
    
    animation = app.animate([
        { transform : fromTransform },
        { transform : toTransform }
    ], {
        duration: options.duration,
        easing: options.easing
    });

    app.style.setProperty('transform', toTransform);
};

window._flipConsole = function(loader, frontToBack, options) {
    var animation,
        fromAngle, toAngle, fromMaxWidth, toMaxWidth, fromTransform, toTransform;

    if (!options || !options.duration || !options.easing) {
        throw Error('flipConsole: missing parameters');
    }

    if (frontToBack) {
        fromAngle = '0deg';
        toAngle = '-180deg';
        fromMaxWidth = '120rem';
        toMaxWidth = '66.5rem';
    } else {
        fromAngle = '180deg';
        toAngle = '0deg';
        fromMaxWidth = '66.5rem';
        toMaxWidth = '120rem';
    }
    
    fromTransform = 'rotate3d(0,1,0,' + fromAngle + ') translate3d(0,0,10px)';
    toTransform = 'rotate3d(0,1,0,' + toAngle + ') translate3d(0,0,10px)';

    if (!frontToBack) {
        loader.style.setProperty('display', 'block');

        loader.animate([
            { maxWidth : fromMaxWidth },
            { maxWidth : toMaxWidth }
        ], {
            duration: options.duration,
            delay: 2000,
            fill: 'forwards',
            easing: 'ease-in'
        });

        setTimeout(function () {
            document.body.classList.add('no-margin');
        }, 2000);
    } else {
        loader.animate([
            { maxWidth : fromMaxWidth },
            { maxWidth : toMaxWidth }
        ], {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease-out'
        });

        document.body.classList.remove('no-margin');
    }

    animation = loader.animate([
        { transform : fromTransform },
        { transform : toTransform }
    ], {
        duration: options.duration,
        easing: options.easing
    });

    loader.style.setProperty('transform', toTransform);

    animation.onfinish = function () {
        if (frontToBack) {
            loader.style.setProperty('display', 'none');
        }
    };
};