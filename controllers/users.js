const User = require('../models/user');
const City = require('../models/city');

function indexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => {
      res.render('users/show', { users });
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
      City
        .find({'visitors': user.id})
        .exec()
        .then((cities) =>{
          res.render('users/show', { user, cities });
        });

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
      res.redirect('cities/index');
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

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((users) => res.redirect(`/users/${users.id}`))
    .catch(next);

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

function newImageRoute(req, res) {
  res.render('users/newImage');
}


function createImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/users'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}



module.exports = {
  index: indexRoute,
  new: newRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  newImage: newImageRoute,
  createImage: createImageRoute
};
