const express = require('express');
const { getItems } = require('../endpoints/getItems.js');
const  { createItem } = require('../endpoints/createItem.js');
const { getOrders } = require('../endpoints/getOrders.js');
const { createOrder } = require('../endpoints/createOrder.js');
const router = express.Router();

router.get('/items', getItems);
router.post('/item', createItem);
router.get('/orders', getOrders);
router.post('/order', createOrder);

module.exports = {
    routes: router
}