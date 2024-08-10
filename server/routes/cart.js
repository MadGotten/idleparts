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
  const { ids } = req.body;

  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: 'Invalid product IDs' });
  }

  try {
    const productMap = ids.reduce((products, id) => {
      products[id] = products[id]
        ? { ...products[id], quantity: products[id].quantity + 1 }
        : { product_id: id, quantity: 1 };
      return products;
    }, {});

    const productsToProcess = [];
    let totalPrice = 0;

    const products = await Product.find({ _id: { $in: ids } });

    for (const product of products) {
      const orderProduct = productMap[product._id];
      const newStock = product.stock - orderProduct.quantity;
      if (newStock < 0) {
        console.error(`Insufficient stock for product ${product._id}`);
        return res.status(400).json({ message: `Insufficient stock for product ${product._id}` });
      } else {
        productsToProcess.push({ _id: product._id, stock: newStock });
        totalPrice += Number(product.price * orderProduct.quantity);
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
      products: Object.values(productMap),
      created_at: new Date(),
    });

    res.status(200).json({ message: 'Checkout successful', order: history });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
