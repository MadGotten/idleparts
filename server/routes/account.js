const express = require('express')
const User = require('../models/user.model')
const Order = require('../models/order.model')
const auth = require('../middleware/auth')

const router = express.Router()

router.use(auth)

router.get('/orders', async (req,res) => {
    const orders = await Order.find({ user_id: req.session.user_id }).populate({
      path: 'products.product_id',
      model: 'Products',
      select: ['name','img']
    }).sort('-created_at')
  
    res.status(200).json({orders: orders})
})
  
router.get('/orders/:id', async (req,res) => {
    const order = await Order.findOne({ user_id: req.session.user_id, _id: req.params.id}).populate({
      path: 'products.product_id',
      model: 'Products',
      select: ['name','img']
    })
  
    res.status(200).json({order: order})
})
  
router.get('/wishlist', async (req,res) => {
    const user = await User.findById(req.session.user_id).populate('wishlist');
  
    res.status(200).json({wishlist: user.wishlist})
})
  
router.post('/wishlist', async (req, res) => {
    try {
        const user = await User.findById(req.session.user_id)
        if (user.wishlist.includes(req.body.productId)){
          throw "Product Already in wishlist"
        }
        user.wishlist.push(req.body.productId)
        await user.save()
        res.status(201).json(user)
        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});
  
  
router.delete('/wishlist/:id', async (req,res) => {
const user = await User.findById(req.session.user_id).populate('wishlist')
    user.wishlist.pull(req.params.id)
    await user.save()
    res.status(204).send()
})


module.exports = router