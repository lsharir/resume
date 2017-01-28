module.exports = (function () {
    var categories = [];

    categories.push({
        type: 1,
        title: 'Work',
        tags: ['work', 'experience', 'job', 'jobs', 'company', 'companies', 'employment']
    });

    categories.push({
        type: 2,
        title: 'Ventures',
        tags: ['project', 'projects', 'work', 'experience', ,'application', 'applications']
    });

    categories.push({
        type: 3,
        title: 'Academia',
        tags: ['education', 'journal', 'publication', 'school', 'university', 'universities', 'college', 'academics', 'academia']
    });

    categories.push({
        type: 4,
        title: 'Skillset',
        tags: ['web', 'skills', 'skill', 'knowledge', 'experience', 'html', 'angular', 'tech', 'technologies', 'javascript', 'framework']
    });


    categories.push({
        type: 5,
        title: 'Military',
        tags: ['military', 'idf', 'army', 'combat', 'flight']
    });

    categories.push({
        type: 6,
        title: 'Leisure Pursuits',
        tags: ['hobby', 'hobbies', 'recreational', 'activities', 'activity']
    });
    
    return categories;
})();