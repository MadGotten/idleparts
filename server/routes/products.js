const express = require('express');
const { getProducts, getProductById, searchProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/search', searchProduct);

module.exports = router;
