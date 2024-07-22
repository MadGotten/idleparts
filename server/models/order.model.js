const mongoose = require('mongoose');

const Order = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'orders' }
);

Order.index({ user_id: 1, created_at: 1 });

const model = mongoose.model('Orders', Order);

module.exports = model;
