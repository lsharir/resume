module.exports = (function () {
    var subjects = [],
        thisDate = new Date(),
        thisYear = thisDate.getYear() + 1900;

    subjects.push({
        type: 1,
        start: 2016,
        end: 2016,
        title: 'Trax Image Recognition - Team Leader',
        description: [
            'Developed and led 2 people while creating:',
            'Photoshop-like tool for monitoring and improving image stitching algorithms',
            'Retail data browser to monitor client\'s regions, stores and products'
        ],
        tags: ['web', 'work', 'image', 'vision', 'big', 'data', 'angular', 'angularjs', 'angular1']
    });

    subjects.push({
        type: 1,
        start: 2015,
        end: 2015,
        title: 'Trax Image Recognition - Junior',
        description: [
            'Developed visual data monitoring tools, specifically:',
            'Flexible pan and zoom tool for images with layered data on top',
            'Various methods to create new data, layered on images'
        ],
        tags: ['web', 'work', 'image', 'vision', 'big', 'data', 'angular', 'angularjs', 'angular1']
    });

    subjects.push({
        type: 2,
        start: 2016,
        end: 2017,
        title: 'Transponder',
        description: [
            'Data management platform - Angular 2 application, Node web servers, Redis websocket server, mongodb databases, additional node detection and mailing services'
        ],
        tags: ['web', 'angular2', 'node', 'redis', 'mongodb', 'server', 'full' ,'stack']
    });

    subjects.push({
        type: 2,
        start: 2014,
        end: 2014,
        title: 'Hawkytalky',
        description: [
            'A web application that manages information flow between co-workers (for Hawk Aviation LTD)'
        ],
        links: [
            { title: 'hawkytalky', href: 'http://hawkytalky.com' }
        ],
        tags: ['web', 'jquery', 'application', 'experience']
    });

    subjects.push({
        type: 2,
        start: 2014,
        end: 2014,
        title: 'Percolation',
        description: [
            'Web app that provides a set of tools to simulate 3d and 2d physical models of percolations through lattices'
        ],
        links: [
            { title: 'percolation', href: 'http://phony1.technion.ac.il/~lsharir' },
            { title: 'example', href: 'http://phony1.technion.ac.il/~lsharir/p3d/percolation.html?objectId=Sam' }
        ],
        tags: ['web', '3d', 'physics', 'simulation', 'experience']
    });

    subjects.push({
        type: 2,
        start: 2013,
        end: 2016,
        title: 'Miscellaneous',
        description: [
            'I enjoy implementing simple ideas to solve every day problems',
            'Lettuce Mix: a websockes application that curates live playlists, a voting system allows the crowd to determine their unified choice'
        ],
        tags: ['web', 'music', 'youtube']
    });

    subjects.push({
        type: 3,
        start: 2010,
        end: 2015,
        title: 'Technion - Israel Institute of Technology',
        description: [
            'B.Sc. in Physics and Mathematics',
            '2 semesters with honors, Grade average 80'
        ],
        tags: ['technion', 'physics', 'math', 'mathematics', 'honors', 'degree', 'graduate']
    });

    subjects.push({
        type: 3,
        start: 2012,
        end: 2013,
        title: 'Carnegie Mellon University',
        description: [
            'Physics, mathematics and computer science as an exchange student',
            'Special topics: Cross Platform Mobile Web Apps, General Relativity'
        ],
        tags: ['cmu', 'carnegie', 'mellon', 'cs', 'computer', 'science','web', 'physics', 'math', 'mathematics', 'exchange']
    });


    subjects.push({
        type: 4,
        start: 2013,
        end: thisYear,
        title: 'Web Development',
        description: [
            'HTML5, JavaScript (ES6), CSS3, TypeScript',
            'Frameworks: AngularJS, Angular2, jQuery + jQuery UI',
            'NodeJS, MongoDB, Socket.IO, Redis, Webpack, Gulp',
            'Experience with a variety of libraries and APIs, selected few: MongooseJS, Firebase, Babylon.js, pre3d.js, d3.js'
        ],
        tags: ['nodejs', 'angular', 'framework', 'web', 'javascript', 'typescript', 'experience']
    });

    subjects.push({
        type: 5,
        start: 2007,
        end: 2008,
        title: 'Israeli Air Force',
        description: [
            'Participated in the first year of pilots\' training program'
        ],
        tags: ['aviation', 'military', 'flight', 'pilot']
    });

    subjects.push({
        type: 5,
        start: 2008,
        end: 2010,
        title: 'Infantry - Nahal Brigade\'s Elite Unit',
        description: [
            'Went through "Orev Nahal" (Crow missile recon.) unit course',
            'Served in Nahal\'s reconnaissance battalion war room'
        ],
        tags: ['combat', 'infantry', 'communication', 'radio']
    });

    subjects.push({
        type: 6,
        start: 2014,
        end: 2015,
        title: 'Technion\'s athletic team',
        description: [
            'As a sprinter - still training sprints until this day'
        ],
        tags: ['sport', 'sport', 'running', 'sprint', 'runner']
    });

    subjects.push({
        type: 6,
        title: 'Aviation enthusiast',
        description: [
            'Assemble and fly remote control models of both helicopters and airplanes'
        ],
        tags: ['aviation', 'flight', 'rc', 'plane', 'helicopter']
    });

    subjects.push({
        type: 6,
        title: 'Film enthusiast',
        description: [
            'Video recording and editing of nonprofessional short films (Adobe Premiere, After Effects)'
        ],
        tags: ['film', 'video', 'design', 'art', 'edit']
    });

    return subjects;
})();