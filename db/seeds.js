const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');

User.collection.drop();


User
  .create([{
    username: 'buki',
    email: 'Bukithompson@hotmail.co.uk',
    age: 25,
    location: 'london',
    password: 'buki',
    passwordConfirmation: 'buki'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
