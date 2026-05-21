const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',
        required: true,
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  tokenNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Ready', 'Completed'],
    default: 'Pending',
  },
  estimatedWaitTime: {
    type: Number, // in minutes
    default: 10,
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
