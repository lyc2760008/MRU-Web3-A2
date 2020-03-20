const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const parser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');

// get our data model
// const Movie = require('./models/Movie');
// const Brief = require('./models/Brief');
var cors = require('cors');

require('dotenv').config();
// create connection to database
require('./handlers/dataConnector.js').connect();
// create an express app
const app = express();
app.use(cors());


/* --- middle ware section --- */
// view engine setup
// app.set('views', './views');
// app.set('view engine', 'pug');
app.use(expressLayouts);
app.set('view engine', 'ejs'); 

/* --- middleware section --- */
// serves up static files from the public folder.
app.use(express.static('public'));
// also add a path to static
app.use('/static', express.static('public'));

// app.set('views', __dirname + '/client/src');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// tell node to use json and HTTP header features in body-parser
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// Express session
app.use(cookieParser('oreos'));
app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Use express flash
app.use(flash());
// set up the passport authentication
require('./handlers/auth.js');
// set up route handlers
const openRoutes = require('./handlers/openRouter.js');
app.use('/', openRoutes);
// these routes only if logged in
const apiRoutes = require('./handlers/apiRouter.js');
app.use('/api', apiRoutes );


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
});

// use the route handlers
// const movieRouter = require('./handlers/movieRouter.js');
// movieRouter.handleAllMovies(app, Movie);
// movieRouter.handleSingleMovie(app, Movie);
// movieRouter.handleBriefMovies(app, Brief);
// movieRouter.handleByYearRange(app, Movie);
// movieRouter.handleByRatingRange(app, Movie);
// movieRouter.handleSubString(app, Movie);

// app.use(function (req, res, next) {
//     res.status(404).send("Sorry can't find that!")
//     });

let port = process.env.PORT || 8080;
app.listen(port, function () {
console.log("Server now running at port= " + port);
});