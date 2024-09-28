const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();

router.get('/:category', async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = 2;

  try {
    const totalCount = await Product.countDocuments({ category: req.params.category });
    const totalPages = Math.ceil(totalCount / limit);

    const products = await Product.find({ category: req.params.category })
      .limit(limit)
      .skip(page * limit);
    if (products && products.length > 0) {
      res.status(200).json({
        currentPage: page,
        totalPages: totalPages,
        items: products,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
