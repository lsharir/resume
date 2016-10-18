module.exports = (function () {
    var categories = [];

    categories.push({
        type: 1,
        title: 'Work',
        tags: ['work', 'experience', 'job', 'jobs', 'company', 'companies', 'employment']
    });

    categories.push({
        type: 2,
        title: 'Education',
        tags: ['education', 'school', 'university', 'universities', 'college', 'academics', 'academia']
    });

    categories.push({
        type: 3,
        title: 'Skillset',
        tags: ['web', 'skills', 'skill', 'knowledge', 'experience', 'html', 'angular', 'tech', 'technologies', 'javascript', 'framework']
    });


    categories.push({
        type: 4,
        title: 'Military',
        tags: ['military', 'idf', 'army', 'combat', 'flight']
    });

    categories.push({
        type: 5,
        title: 'Leisure Pursuits',
        tags: ['hobby', 'hobbies', 'recreational', 'activities', 'activity']
    });

    categories.push({
        type: 6,
        title: 'Notable Projects',
        tags: ['project', 'projects', 'work', 'experience', ,'application', 'applications']
    });
    return categories;
})();