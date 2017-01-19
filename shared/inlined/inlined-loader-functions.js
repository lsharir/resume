(function inlinedLoader() {
    function startLoader(loader, app, codeBlock) {
        var preloadInterval,
            typewriter = { remainingCode: '' },
            preloadIndex = 0,
            preloadBS = getPreloadBS();

        function typewriteCode(code, duration, clear) {
            var pace = code.length / duration;
            // clear previous running interval
            clearInterval(typewriter.interval);

            if (clear) {
                codeBlock.innerHTML = '';
            } else {
                codeBlock.innerHTML += typewriter.remainingCode;
            }

            typewriter.remainingCode = code;
            typewriter.charsDebt = 0;
            typewriter.previousUpdate = Date.now();

            typewriter.interval = setInterval(function () {
                var charsToType = (Date.now() - typewriter.previousUpdate) * pace + typewriter.charsDebt,
                    integerCharsToType = Math.floor(charsToType),
                    stringToAppend = typewriter.remainingCode.substr(0, integerCharsToType);

                // updating the previous update timestamp
                typewriter.previousUpdate = Date.now();
                // slice out and leave the rest of the code
                typewriter.remainingCode = typewriter.remainingCode.slice(integerCharsToType);
                // leave the remainder of the chars taken
                typewriter.charsDebt = charsToType - integerCharsToType;

                codeBlock.innerHTML += stringToAppend;

                // substr takes our only the remaining part of the string, while slice returns '' if we sliced beyond the edge
                if (typewriter.remainingCode.length === 0) {
                    clearInterval(typewriter.interval);
                }
            }, 20);
        }

        preloadInterval = setInterval(function () {
            typewriteCode(preloadBS[preloadIndex++], 0, false);

            if (preloadIndex >= preloadBS.length) {
                clearInterval(preloadInterval);
            }
        }, 1000);

        // assigning global variables to continue the animation sequence from the app
        window.flipLoader = function () {
            var options = {
                duration: 4000,
                easing: 'cubic-bezier(0.75,0,0.25,1)'
            };

            clearInterval(preloadInterval);
            typewriteCode(getCode(), 1500, true);

            window._flipConsole(loader, true, options);
            window._flipApp(app, false, options);
        };

        window.backToConsole = function () {
            var options = {
                duration: 3000,
                easing: 'cubic-bezier(1,0,0,1)'
            };

            typewriteCode(getExitCode(), 2000, true);

            window._flipConsole(loader, false, options);
            window._flipApp(app, true, options);
        }
    }

    //DOMContentLoaded was acting too weird on some browsers
    function getElementsASAP() {
        var loader, app, codeBlock, areWeThereYet;

        areWeThereYet = setInterval(function () {
            loader = document.getElementById('loader');
            app = document.getElementById('app');
            codeBlock = document.getElementById('code-block');
            if (loader && app && codeBlock && window['getCode'] && window['getExitCode'] && window['getPreloadBS']) {
                clearInterval(areWeThereYet);
                startLoader(loader, app, codeBlock);
            }
        }, 25);
    }

    getElementsASAP();
})();