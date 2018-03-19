var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var app = new express();
var bodyparser = require('body-parser'); // pull information from HTML post
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var database = require('./config/database');

require('./config/passport')(passport);

var port = process.env.PORT || 8888;

//app.use(bodyparser.urlencoded({'extended':'true'}));
app.use(bodyparser.json());
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


mongoose.connect(database.url);
// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

/*
//save
app.post('/api/employees/save',(req,res) => {
    var newemp = new Employee({
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    });
    newemp.save().then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
        console.log("catch");
        res.status(404).send(err);
    })
});

app.get('/api/employees', (req,res) => {
    Employee.find().then((data)=>{
        res.send(data);
    }).catch((err) =>{
        res.status(400).send(err);
    })
}); */



// https://scotch.io/tutorials/easy-node-authentication-setup-and-local

app.listen(port);
console.log('App listning on port:'+ port);
