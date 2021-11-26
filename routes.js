const express = require('express');
const router = express.Router();

const fs = require('fs');
let rawdata = fs.readFileSync('./courses.json');
let course = JSON.parse(rawdata);

/*
DEFINE ROUTES
*/
router.get('/', (req, res) => {
    let outputJSON = {
        courses : course["courses"]
    }
    res.json(outputJSON);
});

router.get('/by_instructor/:qname', (req, res) => {
    let query = req.params['qname'];
    let queryLower = query.toLowerCase();
    let queryFirstUpper = String(queryLower.charAt(0).toUpperCase() + queryLower.slice(1));
    filteredCourses = course["courses"].filter(q => (q.instructor.includes(query)||q.instructor.includes(queryLower)||q.instructor.includes(queryFirstUpper)));
    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});

router.get('/by_course_code/:qcode', (req, res) => {
    let query = req.params['qcode'];
    let queryUpper = query.toUpperCase();
    filteredCourses = course["courses"].filter(q => (q.course_code.includes(query)||q.course_code.includes(queryUpper)));
    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});

router.get('/by_level/:qlevel', (req, res) => {
    let query = req.params['qlevel'];
    let queryLower = query.toLowerCase();
    let queryFirstUpper = String(queryLower.charAt(0).toUpperCase() + queryLower.slice(1));
    filteredCourses = course["courses"].filter(q => q.course_level.startsWith(queryFirstUpper));
    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});

router.get('/by_title/:qtitle', (req, res) => {
    let query = req.params['qtitle'];
    let queryLower = query.toLowerCase();
    let queryFirstUpper = String(queryLower.charAt(0).toUpperCase() + queryLower.slice(1));
    filteredCourses = course["courses"].filter(q => (q.title.includes(query)||q.title.includes(queryLower)||q.title.includes(queryFirstUpper)));
    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});


/*
EXPORT ROUTES
*/
module.exports = router;

