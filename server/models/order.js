const { ObjectID } = require('mongodb')
const Database = require('../database.js')

async function getOrderCollection() {
    const database = await Database.singleton();
    return database.db("cart").collection("orders");
}

module.exports = {
    getOrderCollection
}