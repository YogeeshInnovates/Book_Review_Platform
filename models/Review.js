

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // optional
  reviewerName: { type: String, required: true },                // Add reviewerName here
  comment: { type: String, required: true },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
