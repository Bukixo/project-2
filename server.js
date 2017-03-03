//1 require our packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // uses bluebird library to set our the Promise
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { port, env, dbURI, sessionSecret } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');

//2 create and express app
const app = express();



app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// 6 set up our static files folder
app.use(express.static(`${__dirname}/public`)); // whenever you get a request first look inside public folder and if its not there check inside roots

//create database connection.
mongoose.connect(dbURI);

//5 set up middleware

if(env !== 'test') app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride((req) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method; // we dont acidently store it into the databse

    return method;
  }
}));


//7 set up our sessions

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

//8 set up flash messages AFTER sessionSecret. it needs to below 7
app.use(flash());

//12,13 set up custom middleware - both need flash messages
app.use(customResponses);
app.use(authentication);

//set up our routes = just before error handler
app.use(routes);

// 9. touch lib/authentication.js lib/errorHandler.js lib/customResponses lib/secureRoute.js and test
//10.errohandler
//11 secure roots
//12.customResponses
//13.authentication

//14.CREATE registrations, statics and sessions folders inside views folders
//15. forllowed by controllers and its sub files
//16.
// 10.2 set up error handler. always last piece of middleware
app.use(errorHandler);

//4then test
app.listen(port, () => console.log(`Express is listening to port ${port}`));
