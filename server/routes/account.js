const express = require('express');
const auth = require('../middleware/auth');
const { body } = require('express-validator');

const csrfProtect = require('csurf')({ cookie: true });
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.use(auth);

router.get('/', userController.getUser);
router.put(
  '/email',
  csrfProtect,
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  userController.updateUserEmail
);
router.put(
  '/password',
  csrfProtect,
  body('password')
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must be at least 8 characters and must contain at least one big letter, number and special character'
    ),
  userController.updateUserPassword
);
router.delete('/', userController.deleteUser);

router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);

router.get('/wishlist', wishlistController.getWishlist);
router.post('/wishlist', wishlistController.addToWishlist);
router.delete('/wishlist/:id', wishlistController.deleteWishlist);

module.exports = router;
