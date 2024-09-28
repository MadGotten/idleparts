const express = require('express');
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', cartController.getProductsFromCart);
router.post('/checkout', auth, cartController.processCheckout);

module.exports = router;
