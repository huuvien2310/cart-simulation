const MongoClient = require("mongodb").MongoClient;

const { MONGO_URI }= require("./config.js");

class Database {
  static #singleton;

  static async singleton() {
    if (Database.#singleton === undefined) {
      Database.#singleton =
          new MongoClient(MONGO_URI, { useUnifiedTopology: true });
      await Database.#singleton.connect();
    }
    return Database.#singleton;
  }
}


module.exports = Database;
