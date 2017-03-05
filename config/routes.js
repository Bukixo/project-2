const router = require('express'). Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');

router.get('/', (req, res) => res.render('users/index'));

router.route('/users')
  .get(users.index)
  .post(users.create);

router.route('/users/new')
  .get(users.new); //later redirect this to the city page

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/users/:id/edit')
  .get(users.edit);


router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
    .get(sessions.new)
    .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router;
