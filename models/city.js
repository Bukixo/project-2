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

const citySchema = new mongoose.Schema({
  name: {type: String},
  location: {type: String},
  // image: { type: String, required: true},

  //changed type; stirng to type :number
  stars: { type: String, required: true},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('City', citySchema);
