const express = require('express');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const auth = require('../middleware/auth');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const csrfProtect = require('csurf')({ cookie: true });

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(password, salt);
};

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post(
  '/',
  csrfProtect,
  [body('email').trim().isEmail().withMessage('Please enter a valid email'), body('password')],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findById(req.session.user_id);

      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = await hashPassword(password);
      }

      await user.save();
      req.session.user = email;
      res.status(200).json({ message: 'Account updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating account' });
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id);

    await user.deleteOne();
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Account deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account' });
  }
});

router.get('/orders', async (req, res) => {
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
});

router.get('/orders/:id', async (req, res) => {
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
});

router.get('/wishlist', async (req, res) => {
  const user = await User.findById(req.session.user_id).populate('wishlist');

  res.status(200).json({ wishlist: user.wishlist });
});

router.post('/wishlist', async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id);
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(201).json({ message: 'Product added to wishlist', wishlist: req.user.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/wishlist/:id', async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id).populate('wishlist');
    user.wishlist.pull(req.params.id);
    await user.save();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
