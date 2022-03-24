const { getItemCollection } = require('../models/item.js');

const getItems = async (req, res) => {
    const itemCollection = await getItemCollection();
    const item_cursor = itemCollection.find();
    const items = await item_cursor.toArray();
    items.forEach(item => {
        item._id = item._id.toHexString();
    })
    res.status(200).json(items);
}

module.exports = {
    getItems
}