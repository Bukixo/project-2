const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const imagesSchema = new mongoose.Schema({
  filename: { type: String },
  caption: { type: String }
});

imagesSchema
  .virtual('src')
  .get(function getImageSRC(){
    if(!this.filename) return null;
    return `https://s3-eu-west-1.amazonaws.com/wdi-london-buki/${this.filename}`;
  });

const userSchema = new mongoose.Schema({
  username: { type: String},
  email: {type: String},
  image: { type: String },
  age: {type: Number },
  instagramId: {type: Number },
  images: [ imagesSchema ],
  location: { type: String},
  password: {type: String}
});


userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if (this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi-london-buki/${this.image}`;
  });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordconfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation; // by making it vitural we can temporaly save it
  });

//lifcycle hook - moongoose middleware
userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.instagramId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

// where we hash it
userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();

});

//creating an instance method on our user.
//class = like the blueprint. In order to use a class we can use the 'new' keyword in front of it which creates an instances - copy of class. You can maniplute the instances and make them unqiue.
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema); // tells moongose where to store it so itll be db.user
