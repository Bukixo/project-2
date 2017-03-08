const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const City = require('../models/city');

mongoose.connection.dropDatabase();


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
    return City
        .create([{
          name: 'lagos',
          location: 'nigeria',
          // image: 'https://www.ahstatic.com/photos/5011_ho_00_p_346x260.jpg',
          stars: 3,
          createdBy: users[0]
        }]);
  })
    .then((cities) => console.log(`${cities.length} cities created`))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
