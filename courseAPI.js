var express = require('express');
var app = express();

var routes = require('./routes');
app.use('/api', routes);
app.use(express.static('front_end'));


/*
START SERVER
*/
var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server running.");
});
