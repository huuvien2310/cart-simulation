const { getOrderCollection } = require('../models/order.js')

const createOrder = async (req, res) => {
    const orderCollection = await getOrderCollection();
    const result = await orderCollection.insertOne(req.body);
    res.status(201).json(result);
}

module.exports = {
    createOrder
}