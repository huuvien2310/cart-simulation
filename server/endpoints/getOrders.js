const { getOrderCollection } = require('../models/order.js');

const getOrders = async (req, res) => {
    const orderCollection = await getOrderCollection();
    const order_cursor = orderCollection.find();
    const orders = await order_cursor.toArray();
    orders.forEach(order => {
        order._id = order._id.toHexString();
    })
    res.status(200).json(orders);
}

module.exports = {
    getOrders
}