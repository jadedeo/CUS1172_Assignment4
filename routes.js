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

router.get('/combined_query/:q1/:q2', (req, res) => {

    let query1 = req.params['q1'];
    let query2 = req.params['q2'];

    let query1Type = query1.charAt(0);
    let query2Type = query2.charAt(0);

    //console.log(query1 + " " + query2);
    //console.log(query1Type + " " + query2Type);

    let query1Short = query1.substring(1);
    let query2Short = query2.substring(1);

    let query1Lower = query1Short.toLowerCase();
    let query2Lower = query2Short.toLowerCase();

    let query1FirstUpper = String(query1Lower.charAt(0).toUpperCase() + query1Lower.slice(1));
    let query2FirstUpper = String(query2Lower.charAt(0).toUpperCase() + query2Lower.slice(1));

    //console.log(query1FirstUpper);

    filteredCourses = course["courses"];

    if(query1Type == "n" && query2Type == "c"){
        //console.log("N & C QUERY");
        filteredCourses = course["courses"].filter(q => ((q.instructor.includes(query1Short) || q.instructor.includes(query1Lower) || q.instructor.includes(query1FirstUpper)) && (q.course_code.includes(query2Short) || q.course_code.includes(query2Short.toUpperCase()))));
    }
    else if(query1Type == "n" && query2Type == "l"){
        //console.log("N & L QUERY");
        filteredCourses = course["courses"].filter(q => ((q.instructor.includes(query1Short) || q.instructor.includes(query1Lower) || q.instructor.includes(query1FirstUpper)) && q.course_level.includes(query2Short)));
    }
    else if(query1Type == "n" && query2Type == "t"){
        //console.log("N & T QUERY");
        filteredCourses = course["courses"].filter(q => ((q.instructor.includes(query1Short) || q.instructor.includes(query1Lower) || q.instructor.includes(query1FirstUpper)) && (q.title.includes(query2Short) || q.title.includes(query2Lower) || q.title.includes(query2FirstUpper))));
    }
    else if(query1Type == "c" && query2Type == "l"){
        //console.log("C & L QUERY");
        filteredCourses = course["courses"].filter(q => ((q.course_code.includes(query1Short) || q.course_code.includes(query1Short.toUpperCase())) && q.course_level.includes(query2Short)));
    }
    else if(query1Type == "c" && query2Type == "t"){
        //console.log("C & T QUERY");
        filteredCourses = course["courses"].filter(q => ((q.course_code.includes(query1Short) || q.course_code.includes(query1Short.toUpperCase())) && (q.title.includes(query2Short) || q.title.includes(query2Lower) || q.title.includes(query2FirstUpper))));
    }
    else if(query1Type == "l" && query2Type == "t"){
        //console.log("L & T QUERY");
        filteredCourses = course["courses"].filter(q => (q.course_level.includes(query1Short) && (q.title.includes(query2Short) || q.title.includes(query2Lower) || q.title.includes(query2FirstUpper))));
    }

    let outputJSON = {
        courses : filteredCourses
    }
    res.json(outputJSON);
});

/*
EXPORT ROUTES
*/
module.exports = router;

