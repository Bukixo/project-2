const mongoose =require('mongoose');
const commentSchema = new mongoose.Schema({
  content: {type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};


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


const citySchema = new mongoose.Schema({
  name: {type: String},
  location: {type: String},
  lat: {type: Number},
  lng: {type: Number},
  images: [ imagesSchema ],
  stars: { type: String, required: true},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ],
  visitors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('City', citySchema);
