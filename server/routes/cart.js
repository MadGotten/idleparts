const express = require('express');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  const { ids } = req.body;

  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: 'Invalid product IDs' });
  }

  try {
    const products = await Product.find({ _id: ids });
    if (products && products.length > 0) {
      res.status(200).json({ items: products });
    } else {
      res.status(404).json({ message: 'No products found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/checkout', auth, async (req, res) => {
  const { products } = req.body;

  if (!products || Object.keys(products).length === 0) {
    return res.status(400).json({ message: 'Invalid products' });
  }

  try {
    const productsToProcess = [];
    const orderProducts = [];
    let totalPrice = 0;

    const productsEx = await Product.find({ _id: Object.keys(products) });

    for (const product of productsEx) {
      const newStock = product.stock - products[product._id];
      if (newStock < 0) {
        console.error(`Insufficient stock for product ${product._id}`);
        return res.status(400).json({ message: `Insufficient stock for product ${product._id}` });
      } else {
        productsToProcess.push({ _id: product._id, stock: newStock });
        orderProducts.push({ product_id: product._id, quantity: products[product._id] });
        totalPrice += Number(product.price * products[product._id]);
      }
    }

    // Update stock in products
    const updatePromises = productsToProcess.map((product) =>
      Product.updateOne({ _id: product._id }, { $set: { stock: product.stock } })
    );
    await Promise.all(updatePromises);

    const history = await Order.create({
      user_id: req.session.user_id,
      price: Number(totalPrice).toFixed(2),
      products: orderProducts,
      created_at: new Date(),
    });

    res.status(200).json({ message: 'Checkout successful', order: history });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
