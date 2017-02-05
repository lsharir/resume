module.exports = (function() {
    var config = {
        sourceCode: 'https://github.com/lsharir/resume',
        ng1: 'http://ng1.lsharir.com',
        ng2: 'http://ng2.lsharir.com',
        exampleTags: ['education','email'],
        social: {
            linkedin: 'http://www.linkedin.com/in/lsharir',
            googlePlus: 'http://plus.google.com/u/0/+LiranSharir',
            facebook: 'http://facebook.com/lsharir'
        }
    }

    if (process.env.ENV !== 'production') {
        config = Object.assign(config, {
            ng1: 'http://localhost:8080',
            ng2: 'http://localhost:4200'
        });
    }

    return config;
})();