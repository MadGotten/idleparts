const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products && products.length > 0) {
      res.status(200).json({ items: products });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ items: product });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const searchProduct = async (req, res) => {
  if (!req.query.search) {
    return res.status(200).json({ items: [] });
  }
  const searchQuery = req.query.search.trim();
  const searchContext = searchQuery.split(/\s+/);
  const regex = searchContext.map((word) => new RegExp(word, 'i'));
  const query = {
    $and: regex.map((words) => ({ name: words })),
  };
  try {
    const products = await Product.find(query).limit(5);
    if (products && products.length > 0) {
      res.status(200).json({ items: products });
    } else {
      res.status(200).json({ items: [] });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { getProducts, getProductById, searchProduct };
