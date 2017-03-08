const User = require('../models/user');

function authentication(req, res, next) {
  //check to see if user is logged in
  // if not exit this piece of middleware
  if (!req.session.isAuthenticated) return next();

  // find the user based on the userid in the session
  User
    .findById(req.session.userId)

    .then((user) =>{
      if(!user) {
    //if the user cannot be found log out the user
        return req.session.regenerate(() => res.unauthorized());
      }
      //set the user id platform session
      req.session.userId = user.id;

//the the whole user object to the request object
//so we can use the users details in our controllers
      req.user = user;

      //set the whole user object to res.locals so we can use it in the views
      res.locals.user = user;
      // set a isAuthenticated boolean so we show and hide buttons and links
      res.locals.isAuthenticated = true;
      // ok we're done, move on to the next piece of middleware
      return next();
    })
    .catch(next); // handle any erros with our global error catcher
}

module.exports = authentication;
