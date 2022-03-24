const { ObjectID } = require('mongodb')
const Database = require('../database.js')

async function getItemCollection() {
    const database = await Database.singleton();
    return database.db("cart").collection("items");
}

module.exports = {
    getItemCollection
}