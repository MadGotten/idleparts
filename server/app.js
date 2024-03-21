const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path');
const app = express()
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const Product = require('./models/product.model')
const Order = require('./models/order.model')
const User = require('./models/user.model')

const populateProducts = require('./populate/products.json')
const users = require('./routes/users')
const products = require('./routes/products')
const account = require('./routes/account')
const cart = require('./routes/cart')
const category = require('./routes/category')
const secureCookie = true

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
} else {
  dotenv.config({ path: path.resolve(__dirname, '.env.development') });
  secureCookie = false
}

app.use(cors({
  origin: process.env.FRONTEND_DOMAIN,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public', {
  maxAge: '7d'
}))
app.use(express.urlencoded({ extended: true}))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store:  MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 365 * 24 * 60 * 60
  }),
  cookie: { secure:secureCookie ,httpOnly: true, maxAge:365*24*60*60*1000, sameSite: 'lax'}
}))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db succesfully connected!")

    Product.deleteMany({}).then(() => {
      Product.create(populateProducts)
    })
    User.deleteMany({}).exec()
    Order.deleteMany({}).exec()
    mongoose.connection.db.collection('sessions').deleteMany({})
  })
  .then(() => {
    console.log("Documents deleted successfully.");
  })
  .catch((err) => {
    console.log(err)
});

app.use("/users", users)
app.use("/products", products)
app.use("/account", account)
app.use("/cart", cart)
app.use("/category", category)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})