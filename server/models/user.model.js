const mongoose = require('mongoose')

const User = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]
    },
    { collection: 'users' }
)

const model = mongoose.model('Users', User)

module.exports = model