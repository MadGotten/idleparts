const Product = require('../models/productModel');
const Order = require('../models/orderModel');

const getProductsFromCart = async (req, res) => {
  const { ids } = req.body;

  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: 'Invalid product IDs' });
  }

  try {
    const products = await Product.find({ _id: ids });
    if (products && products.length > 0) {
      res.status(200).json({ items: products });
    } else {
      res.status(404).json({ message: 'No products found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const processCheckout = async (req, res) => {
  const { products } = req.body;
  const productIds = Object.keys(products);

  if (!products || productIds.length === 0) {
    return res.status(400).json({ message: 'Invalid products' });
  }

  try {
    const productList = await Product.find({ _id: productIds });

    const orderProducts = [];
    let totalPrice = 0;

    for (const product of productList) {
      const newStock = product.stock - products[product._id];
      if (newStock < 0) {
        console.error(`Insufficient stock for product ${product._id}`);
        return res.status(400).json({ message: `Insufficient stock for product ${product._id}` });
      } else {
        orderProducts.push({ product_id: product._id, quantity: products[product._id] });
        totalPrice += Number(product.price * products[product._id]);
        product.stock = newStock;
      }
    }

    // Update stock in products
    const updatePromises = productList.map((product) => ({
      updateOne: { filter: { _id: product._id }, update: { $set: { stock: product.stock } } },
      //Product.updateOne({ _id: product._id }, { $set: { stock: product.stock } })
    }));
    //await Promise.all(updatePromises);
    await Product.bulkWrite(updatePromises);

    const history = await Order.create({
      user_id: req.session.user_id,
      price: Number(totalPrice).toFixed(2),
      products: orderProducts,
      created_at: new Date(),
    });

    res.status(200).json({ message: 'Checkout successful', order: history });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProductsFromCart, processCheckout };
