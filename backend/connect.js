const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient("mongodb+srv://218634567:KEdDYtAZoIGAiIYN@cluster0.46whv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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
