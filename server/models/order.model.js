const mongoose = require('mongoose')

const Order = new mongoose.Schema({
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        products: [{
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 }
        }],
        price: { type: Number, required: true },
        created_at: { type: Date, default: Date.now },
    },
    { collection: 'orders' }
)

const model = mongoose.model('Orders', Order)

module.exports = model