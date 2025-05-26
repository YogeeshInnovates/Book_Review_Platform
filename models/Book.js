// const mongoose =require('mongoose');

// const bookSchema= new mongoose.Schema({
//      title: String,
//   author: String,
//   description: String,
//   rating: Number
// });

// module.exports=mongoose.model('Book',bookSchema);





const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  genre: String,
  rating: { type: Number, default: 0 },
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
