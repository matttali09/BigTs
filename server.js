// require dependencies
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
// const flash = require('connect-flash');
const mongoose = require("mongoose");
const routes = require("./routes");

// setup port then express as app
const PORT = process.env.PORT || 3001;
const app = express();

// ============================ MIDDLEWARE
// app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//cookie parser is required for sessions to appear
app.use(cookieParser());

// We need to use sessions to keep track of our user's login status
app.use(session({
    secret: ["keyboard cat", "play chopsticks"],
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
// app.use(flash());

// Static directory
app.use(express.static("server-assets"));

// create static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
 app.use(express.static(path.join(__dirname, './bigts/build')));
};

// let express use the required routes.
app.use(routes)

/* === Express 404 error handler === */
// app.use(function (req, res, next) {
//     var err = new Error('404 in Server.js, route Not Found');
//     err.status = 404;
//     next(err);
// });

/* === Server-Side Authentication w/passport.js on our Model === */
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bigtsuserlist", 
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// development and production errorhandling
// app.configure('development', function(){
//     app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });

// app.configure('production', function(){
//     app.use(express.errorHandler());
// });

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});