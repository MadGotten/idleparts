const mongoose = require('mongoose')

const Product = new mongoose.Schema({
        name: { type: String, required: true, },
        price: { type: Number, required: true },
        category: {type: String, required: true},
        rating: { type: String },
        filter: { type: String },
        category: { type: String },
        stock: {type: Number},
        img: {type: String}
    },
    { collection: 'products' }
)

const model = mongoose.model('Products', Product)

module.exports = model