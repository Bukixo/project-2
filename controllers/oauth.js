const config = require('../config/oauth');
const User = require('../models/user');
const rp = require('request-promise');

function instagram(req, res, next) {
  return rp({
    method: 'POST',
    url: config.instagram.accessTokenURL,
    form: {
      client_id: config.instagram.clientId,
      client_secret: config.instagram.clientSecret,
      redirect_uri: config.instagram.redirectUri,
      grant_type: 'authorization_code',
      code: req.query.code
    },
    json: true
  })
  .then((profile) => {
    req.session.accessToken = profile.access_token;

    return User
      .findOne({ instagramId: profile.user.id })
      .then((user) => {
        if(!user) {
          user = new User({
            username: profile.user.username
          });
        }

        user.instagramId = profile.user.id;
        user.image = profile.user.profile_picture;
        return user.save();
      });
  })
  .then((user) => {
    req.session.userId = user.id;
    req.session.isAuthenticated = true;

    req.flash('info', `Welcome back, ${user.username}!`);
    res.redirect(`/users/${user.id}`);
  })
  .catch(next);
}

module.exports = {
  instagram
};
