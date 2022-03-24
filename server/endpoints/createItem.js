const { getItemCollection } = require('../models/item.js')

const createItem = async (req, res) => {
    const itemCollection = await getItemCollection();
    const result = await itemCollection.insertOne(req.body);
    res.status(201).json(result);
}

module.exports = {
    createItem
}