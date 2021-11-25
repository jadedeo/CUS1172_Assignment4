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
    //console.log(course.results);
    res.json(outputJSON);
    
});

router.get('/by_course_code/:qcode', (req, res) => {
    let query = req.params['qcode'];
    filteredCourses = course["courses"].filter(q => q.course_code.includes(query));
    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});

router.get('/by_title/:qtitle', (req, res) => {
    let query = req.params['qtitle'];
    filteredCourses = course["courses"].filter(q => q.title.includes(query));
    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});

router.get('/by_instructor/:qname', (req, res) => {
    let query = req.params['qname'];
    filteredCourses = course["courses"].filter(q => q.instructor.includes(query));
    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});

router.get('/by_level/:qlevel', (req, res) => {
    let query = req.params['qlevel'];
    filteredCourses = course["courses"].filter(q => q.course_level.includes(query));
    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});

/*
EXPORT ROUTES
*/
module.exports = router;

