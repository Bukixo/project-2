function secureRoute(req, res, next) {
  if(!req.session.isAuthenticated || !req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('alert', 'YOU MUST BE LOGGED IN');
      return res.redirect('/login');
    });
  }

  next();
}

module.exports = secureRoute; // then make routes files in config

//used for the routes. acts like a barrier if ur no authorized
