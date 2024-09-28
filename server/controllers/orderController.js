const Order = require('../models/orderModel');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.session.user_id })
      .populate({
        path: 'products.product_id',
        model: 'Products',
        select: ['name', 'img'],
      })
      .sort('-created_at');

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      user_id: req.session.user_id,
      _id: req.params.id,
    }).populate({
      path: 'products.product_id',
      model: 'Products',
      select: ['name', 'img'],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getOrders, getOrderById };
