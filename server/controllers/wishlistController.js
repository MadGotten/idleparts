const User = require('../models/userModel');
const Product = require('../models/productModel');

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const user = await User.findById(req.session.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const product = await Product.exists({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    user.wishlist.push(productId);
    await user.save();

    const wishlist = await Product.find({ _id: { $in: user.wishlist } });

    res.status(201).json({ message: 'Product added to wishlist', wishlist: wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.wishlist.pull(req.params.id);
    await user.save();

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getWishlist, addToWishlist, deleteWishlist };
