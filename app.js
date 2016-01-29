var express = require('express');
var path =require('path');
var logger =require('morgan');
var bodyParser =require('body-parser');

var join =require('./routes/join');
var login = require('./routes/login');
var userinfo = require('./routes/userinfo');
var updates = require('./routes/updates');

var search = require('./routes/search');
var searchfriend= require('./routes/searchfriend');

var ranktest = require('./routes/ranktest');
var allrank = require('./routes/allrank');
var myrank = require('./routes/myrank');
var app =express();

app.set('views', path.join( __dirname, 'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join( __dirname,'public')));

app.use('/join', join);
app.use('/login',login);
app.use('/userinfo',userinfo);
app.use('/updates',updates);
app.use('/search',search);
app.use('/searchfriend',searchfriend);

app.use('/ranktest',ranktest);
app.use('/allrank',allrank);
app.use('/myrank',myrank);
// catch 404 and forward to errorhandler 
app.use(function(req, res, next){
    var err = new Error('NotFound');
    err.status =404;
    next(err);
});
//error handlers
if (app.get('env') === 'development'){
    app.use(function(err, req, res, next){ 
        res.status(err.status ||500);
        res.render('error', { message: err.message, error: err});
    });
}
app.use(function(err, req, res, next){ 
    res.status(err.status ||500);
    res.render('error', { message: err.message, error: {}});
});
module.exports =app;