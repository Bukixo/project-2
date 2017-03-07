const oauth = require('../config/oauth');
const User = require('../models/user');
const config = require('../config/oauth');

function instagram(req, res, next) {
  res.send();
  next();
}

module.exports = {
  instagram
};
