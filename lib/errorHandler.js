const { env } = require('../config/environment');
// its a global error catcher. it inspects all the error and se what error it is ie 404, 500 etc 
function errorHandler(err, req, res, next) { // handle erros and turn into html to show to the users
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  if(env === 'production') delete err.stack;

  res.status(err.status);
  res.locals.err = err;
  res.render(`statics/${err.status}`);
  next(err);

}

module.exports = errorHandler;

//then require on server.js
