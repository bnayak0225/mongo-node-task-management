const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://biswa:1234567890@cluster0.e869s.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
    }
});
module.exports = client
