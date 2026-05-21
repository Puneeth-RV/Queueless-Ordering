const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);
