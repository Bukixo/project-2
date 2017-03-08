const City = require('../models/city');

function indexRoute(req, res, next) {
  City
    .find()
    .populate('createdBy')
    .exec()
    .then((cities) => res.render('cities/index', { cities }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('cities/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;
  City
    .create(req.body)
    .then(() => res.redirect('/cities'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/cities/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  City
    .findById(req.params.id)
    .populate('comments.createdBy visit')
    .exec()
    .then((city) => {
      if(!city) return res.notFound();
      return res.render('cities/show', { city });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  City
    .findById(req.params.id)
    .exec()
    .then((city) => {
      if(!city) return res.redirect();
      if(!city.ownedBy(req.user)) return res.unauthorized(`/cities/${city.id}`, 'You do not have permission to edit that resource');
      return res.render('ciities/edit', { city });
    })
    .catch(next);
}


function updateRoute(req, res, next) {
  City
    .findById(req.params.id)
    .exec()
    .then((city) => {
      if(!city) return res.notFound();

      for(const field in req.body) {
        city[field] = req.body[field];
      }

      return city.save();
    })
    .then(() => res.redirect(`/cities/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/cities/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  City
    .findById(req.params.id)
    .exec()
    .then((city) => {
      if(!city) return res.notFound();
      return city.remove();
    })
    .then(() => res.redirect('/cities'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user; // attaches user on the comment

  City
  .findById(req.params.id)
  .exec()
  .then((city) => {
    if(!city) return res.notFound();

    city.comments.push(req.body); // create an embedded record
    return city.save();
  })
    .then((city) => res.redirect(`/cities/${city.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  City
    .findById(req.params.id)
    .exec()
    .then((city) => {
      if (!city) return res.notFound();
      const comment = city.comments.id(req.params.commentId);
      comment.remove();

      return city.save();
    })

  .then((city) => res.redirect(`/cities/${city.id}`))
  .catch(next);
}


function newImageRoute(req, res) {
  res.render(`cities/newImage`);
}


function createImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/cities'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest(`/cities/images/new`, err.toString());
      next(err);
    });
}

// POST /cities/:id/vistor
function addVisitorRoute(req, res, next) {
  City
    .findById(req.params.id)
    .exec()
    .then((city) => {
      if (!city) return res.notFound();
      city.visitors.push(req.user);
      return city.save();
    })
    .then((city) => res.redirect(`/cities/${city.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  newImage: newImageRoute,
  createImage: createImageRoute,
  addVisitor: addVisitorRoute
};
