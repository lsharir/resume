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
            'Led two people to create innovative software and learn new technologies.',
            'Devised and implemented a user interface to monitor and correct image stitching algorithms.',
            'Developed a retail data browser which integrates with pre-existing features I previously wrote and extended into features that followed its launch.'
        ],
        tags: ['web', 'work', 'image', 'vision', 'big', 'data', 'angular', 'angularjs', 'angular1']
    });

    subjects.push({
        type: 1,
        start: 2015,
        end: 2015,
        title: 'Trax Image Recognition - Junior Dev',
        description: [
            'Developed visual data monitoring tools, specifically:',
            'Flexible pan and zoom tool for images with layered data on top.',
            'Various methods to create data, layered on images.'
        ],
        tags: ['web', 'work', 'image', 'vision', 'big', 'data', 'angular', 'angularjs', 'angular1']
    });

    subjects.push({
        type: 2,
        start: 2016,
        end: 2017,
        title: 'Transponder - Automated Event Driven Data Manager',
        description: [
            'A solution I invented (under development) for assessing interorganizational data flows, which provide automation and straightforward interfacing to events.',
            'Angular 2 application, Node web servers, Redis websocket server, mongodb databases, additional node detection, mailing services.'
        ],
        tags: ['web', 'invent', 'angular2', 'node', 'redis', 'mongodb', 'server', 'full' ,'stack']
    });

    subjects.push({
        type: 2,
        start: 2014,
        end: 2014,
        title: 'Hawkytalky - Event Driven Data Manager',
        description: [
            'A solution I created for monitoring interorganizational data flows (for Hawk Aviation LTD).',
            'Web application, Node web servers, websockets, mongodb database.'
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
        title: 'Percolation - Computational Physics Simulator',
        description: [
            'A WebGL/Web application that assists students to analyze and learn theories of percolation by rendering 3D or 2D physical models of lattices.'
        ],
        links: [
            { title: 'percolation', href: 'http://phony1.technion.ac.il/~lsharir' },
            { title: 'example', href: 'http://phony1.technion.ac.il/~lsharir/p3d/percolation.html?objectId=Sam' }
        ],
        tags: ['web', '3d', 'physics', 'simulation', 'experience']
    });

    subjects.push({
        type: 3,
        start: 2017,
        end: 2017,
        title: 'Published Article - The European Physical Journal',
        description: [
            'Percolation in education and application in the 21st century',
            'Authors: Joan Adler, Shaked Elfenbaum and Liran Sharir'
        ],
        tags: ['technion', 'physics', 'computational', 'scientific', 'publications']
    });

    subjects.push({
        type: 3,
        start: 2010,
        end: 2015,
        title: 'Technion - Israel Institute of Technology',
        description: [
            'Bachelor of Science in Physics and Mathematics',
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
            'Physics, Mathematics and Computer Science as an exchange student.',
            'Special topics: General Relativity and Cross Platform Mobile Web Apps.'
        ],
        tags: ['cmu', 'carnegie', 'mellon', 'cs', 'computer', 'science','web', 'physics', 'math', 'mathematics', 'exchange']
    });


    subjects.push({
        type: 4,
        start: 2013,
        end: thisYear,
        title: 'Front End Web Development',
        description: [
            'Front end development is my great passion, very motivated to create smooth and animated visuals',
            'Environments: HTML5, JavaScript, TypeScript, CSS3, WebGL',
            'Frameworks: AngularJS, Angular2, jQuery + jQuery UI',
            'Builds: Webpack, Gulp',
            'Misc: BabylonJS, Pre3D, D3.js, RxJS, Lodash and infinitely many other libraries'
        ],
        tags: ['nodejs', 'angular', 'framework', 'web', 'javascript', 'typescript', 'experience']
    });

    subjects.push({
        type: 4,
        start: 2013,
        end: thisYear,
        title: 'Back End Web Development',
        description: [
            'Back end interests me because of how great it is to accurately manipulate data streams',
            'Environments: NodeJS, MongoDB, WebSockets, Workers, Firebase',
            'Libraries: ExpressJS, MongooseJS, Socket.IO, Async, Crypto',
            'Misc: Node-Mailer, Lodash, Passport, Bluebird and many other libraries',
        ],
        tags: ['nodejs', 'angular', 'framework', 'web', 'javascript', 'typescript', 'experience']
    });

    subjects.push({
        type: 5,
        start: 2007,
        end: 2008,
        title: 'Israeli Air Force',
        description: [
            'Participated in the first year of pilots\' training program.'
        ],
        tags: ['aviation', 'military', 'flight', 'pilot']
    });

    subjects.push({
        type: 5,
        start: 2008,
        end: 2010,
        title: 'Infantry - Nahal Brigade\'s Elite Unit',
        description: [
            'Participated in "Orev Nahal" unit course.',
            'Served in Nahal\'s battalion war room.'
        ],
        tags: ['combat', 'infantry', 'communication', 'radio']
    });

    subjects.push({
        type: 5,
        start: 2010,
        end: 2016,
        title: 'Infantry - Paratroopers Brigade',
        description: [
            'Trained as a combat soldier in a Paratroopers reserve\'s unit.'
        ],
        tags: ['combat', 'infantry', 'parachute', 'paratrooper']
    });

    subjects.push({
        type: 6,
        start: 2014,
        end: 2015,
        title: 'Technion\'s athletic team',
        description: [
            'As a sprinter - passionate about interval training until this day.'
        ],
        tags: ['sport', 'sport', 'running', 'sprint', 'runner']
    });

    subjects.push({
        type: 6,
        title: 'Aviation enthusiast',
        description: [
            'Private helicopter student - Robinson R22 helicopter.',
            'Model aircrafts - assemble and fly remote controlled scale models of helicopters and airplanes.'
        ],
        tags: ['aviation', 'flight', 'rc', 'plane', 'helicopter']
    });

    subjects.push({
        type: 6,
        title: 'Film enthusiast',
        description: [
            'Video recording and editing of nonprofessional short films (Adobe Premiere, After Effects).'
        ],
        tags: ['film', 'video', 'design', 'art', 'edit']
    });

    return subjects;
})();