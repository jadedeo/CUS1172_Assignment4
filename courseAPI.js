var express = require('express');
var app = express();

var routes = require('./routes');
app.use('/api', routes);
app.use(express.static('front_end'));


/*
START SERVER
*/
app.listen(3000, () => {
    console.log("Server running.");
});

