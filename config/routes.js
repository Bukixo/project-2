const router = require('express'). Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const cities = require('../controllers/cities');
const upload = require('../lib/upload');
const oauth = require('../controllers/oauth');


router.get('/', (req, res) => res.redirect('/login'));

router.route('/users')
  .get(secureRoute, users.index)
  .get(secureRoute, registrations.show)
  .post(secureRoute, users.create);

router.route('/users/new')
  .get(secureRoute, users.new); //later redirect this to the city page

router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/users/:id/images/new')
  .get(secureRoute, users.newImage);

router.route('/users/:id/images')
  .post(secureRoute, upload.single('filename'), users.createImage);


router.route('/cities')
  .get(cities.index)
  .post(secureRoute, cities.create);
//
router.route('/cities/new')
  .get(secureRoute, cities.new)
  .post(secureRoute, cities.create);
//
router.route('/cities/:id')
  .get(cities.show)
  .put(secureRoute, cities.update)
  .delete(secureRoute, cities.delete);

router.route('/cities/:id/visitors')
  .post(secureRoute, cities.addVisitor);

// router.route('/cities/:id/visitors/:visitorId')
//   .delete(secureRoute, cities.deleteVisitor);

router.route('/cities/:id/comments')
  .post(secureRoute, cities.createComment);

router.route('/cities/:id/comments/:commentId')
  .delete(secureRoute, cities.deleteComment);


router.route('/user/images/new')
  .get(secureRoute, users.newImage);

router.route('/user/images')
  .post(secureRoute, upload.single('filename'), users.createImage);

router.route('/cities/:id/images/new')
  .get(secureRoute, cities.newImage);

router.route('/cities/:id/images')
  .post(secureRoute, upload.single('filename'), cities.createImage);


router.route('/register')
  .get(registrations.new)
  .post(upload.single('image'), registrations.create);

router.route('/login')
    .get(sessions.new)
    .post(sessions.create);


router.route('/logout')
    .get(sessions.delete);

router.route('/oauth/instagram')
    .get(oauth.instagram);


router.all('*', (req, res) => res.notFound());

module.exports = router;
