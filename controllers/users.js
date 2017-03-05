const User = require('../models/user');

function indexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => {
      res.render('users/index', { users });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function newRoute(req, res) {
  res.render('users/new');
}

function showRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.status(404).end('Not Found');
      res.render('users/show', { user });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function createRoute(req, res) {
  User
    .create(req.body)
    // create the form data in req.body
    .then(() => {
      res.redirect('/users');
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function editRoute(req, res){
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.status(404).end('Not Found');
      res.render('users/edit', { user });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function updateRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    // found the original user that is being updated
    .then((user) => {
      if (!user) return res.status(404).send('Not Found');
      // for each key value pair, puts the value from the updating form and puts it on the object
      for(const field in req.body) {
        user[field] = req.body[field];
      }
// and then save that updated entry in the database
      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function deleteRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user) return res.status(404).send('Not Found');
      return user.remove();
    })
    .then(() => {
      res.redirect('/users');
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
