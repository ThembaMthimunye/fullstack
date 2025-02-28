const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "../frontend/.env" });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = {
  connectToServer: () => {
    database = client.db("blogData");
  },
  getDb: () => {
    return database;
  },
};
