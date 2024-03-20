const express = require('express')
const Product = require('../models/product.model')
const Order = require('../models/order.model')
const router = express.Router()

router.post('/', async (req, res) => {
    const ids = req.body.ids;
    try {
        const products = await Product.find({ _id: ids});
        if (products && products.length > 0) {
          res.status(200).json({ items: products });
        } else {
            res.sendStatus(400)
        }
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})
  
router.post('/checkout', async (req, res) => {
    const ids = req.body.ids
    if (req.session.user) {
        const productMap = {}
        ids.forEach(id => {
            if (productMap[id]) {
                productMap[id].quantity++
            } else {
                productMap[id] = { product_id: id, quantity: 1 }
            }
        });

        const products = Object.values(productMap);
        let price = 0

        const getProducts = await Product.find({ _id: { $in: ids } })

        const productsToProcess = [];

        for (const product of getProducts) {
            const foundProduct = products.find(p => String(p.product_id) === String(product._id))

            if (foundProduct) {
                const newStock = product.stock - foundProduct.quantity
                if (newStock < 0) {
                    console.error(`Insufficient stock for product ${product._id}`)
                    return res.sendStatus(400)
                } else {
                    productsToProcess.push({ _id: product._id, stock: newStock })
                    price += Number(product.price * foundProduct.quantity)
                }
            }
        }

        for (const product of productsToProcess) {
            await Product.updateOne({ _id: product._id }, { $set: { stock: product.stock } });
        }

        history = await Order.create({
            user_id: req.session.user_id,
            price: Number(price).toFixed(2),
            products: products,
            created_at: new Date()
        })
        res.status(200).json({ message: "Checkout successful" })
    }
})

module.exports = router