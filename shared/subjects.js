module.exports = (function () {
    var subjects = [],
        thisDate = new Date(),
        thisYear = thisDate.getYear() + 1900;

    subjects.push({
        type: 1,
        start: 2015,
        end: 2016,
        title: 'Trax Image Recognition',
        description: [
            'Junior web developer (8 months)',
            'Team leader (4 months)',
            'Developed and lead development of:',
            'Photoshop-like tool for monitoring and improving image stitching systems',
            'Browser that exposes collected data to customers'
        ],
        tags: ['web', 'image', 'vision', 'big', 'data', 'angular', 'angularjs', 'angular1']
    });

    subjects.push({
        type: 2,
        start: 2010,
        end: 2015,
        title: 'Technion - Israel Institute of Technology',
        description: [
            'B.Sc. in Physics and Mathematics',
            'Grade average 80, 2 semesters with honors'
        ],
        tags: ['technion', 'physics', 'math', 'mathematics', 'honors', 'degree', 'graduate']
    });

    subjects.push({
        type: 2,
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
        type: 2,
        start: 2007,
        end: 2008,
        title: 'Ben Gurion University',
        description: [
            'Participated in courses for IAF\'s pilot training program'
        ],
        tags: ['iaf', 'flight', 'aviation', 'military', 'army', 'meteorology']
    });

    subjects.push({
        type: 2,
        start: 2004,
        end: 2007,
        title: 'Ben Zvi High School',
        description: [
            'Graduated with honors; majored in physics, mathematics, computer science, chemistry and english'
        ],
        tags: ['high', 'school', 'honors', 'physics', 'math', 'chemistry']
    });

 
    subjects.push({
        type: 2,
        start: 2002,
        end: 2005,
        title: 'Bar Ilan University',
        description: [
            'Participated in talented youth program in mathematics - graduated high school math there',
            'Selected courses of B.Sc. in Mathematics'
        ],
        tags: ['high', 'school', 'honors', 'physics', 'math', 'chemistry']
    });   


    subjects.push({
        type: 3,
        start: 2013,
        end: thisYear,
        title: 'Web Development',
        description: [
            'HTML5, JavaScript (ES6), CSS3, TypeScript',
            'Frameworks: AngularJS, Angular2, jQuery + jQuery UI',
            'NodeJS, MongoDB, Socket.IO, Redis, Webpack, Gulp',
            'Experience with a variety of libraries and APIs, selected few: MongooseJS, Firebase, Babylon.js, pre3d.js'
        ],
        tags: ['nodejs', 'angular', 'framework', 'web', 'javascript', 'typescript', 'experience']
    });

    subjects.push({
        type: 4,
        start: 2007,
        end: 2008,
        title: 'Israeli Air Force',
        description: [
            'Participated in the first year of pilots\' training program'
        ],
        tags: ['aviation', 'military', 'flight', 'pilot']
    });

    subjects.push({
        type: 4,
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
        type: 5,
        start: 2014,
        end: 2015,
        title: 'Technion\'s athletic team member',
        description: [
            'As a sprinter - still training sprints until this day'
        ],
        tags: ['sport', 'sport', 'running', 'sprint', 'runner']
    });

    subjects.push({
        type: 5,
        title: 'Aviation enthusiast',
        description: [
            'Assembled and fly remote control models of both helicopters and airplanes'
        ],
        tags: ['aviation', 'flight', 'rc', 'plane', 'helicopter']
    });

    subjects.push({
        type: 5,
        title: 'Film enthusiast',
        description: [
            'Video recording and editing of nonprofessional short films (Adobe Premiere, After Effects)'
        ],
        tags: ['film', 'video', 'design', 'art', 'edit']
    });

    subjects.push({
        type: 6,
        start: 2014,
        end: 2014,
        title: 'hawkytalky',
        description: [
            'a small web application to manage immediate communication and information sharing between co-workers for Hawk Aviation LTD (a company my father is partner in)'
        ],
        links: [
            { title: 'hawkytalky', href: 'http://hawkytalky.com' }
        ],
        tags: ['web', 'jquery', 'application', 'experience']
    });

    subjects.push({
        type: 6,
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
        type: 6,
        start: 2016,
        end: 2016,
        title: 'Transponder',
        description: [
            'Data management platform - Angular 2 application, Node web servers, Redis websocket server, mongodb databases, additional node detection and mailing services'
        ],
        tags: ['web', 'angular2', 'node', 'redis', 'mongodb', 'server', 'full' ,'stack']
    });

    subjects.push({
        type: 6,
        start: 2013,
        end: 2016,
        title: 'Miscellaneous',
        description: [
            'I build small web apps on my free time to solve simple life problems. Such as:',
            'Lettuce Mix: a tool to curate playlists from event\'s participants\' suggestions, along with a voting system to play songs according to popularity'
        ],
        tags: ['web', 'music', 'youtube']
    });

    return subjects;
})();