const client = require("./conectonSql")
const {ObjectId} = require("mongodb");
const getTask = async (id) => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const db = await client.db('test');
        console.log("You successfully connected to MongoDB");
        const objectId = new ObjectId(id)
        let res = await db.collection("task").findOne({_id: objectId});
        console.log(res)
        await client.close()
        return res
    }catch (e){
        await client.close()
        console.log(e)
    }

}
module.exports = getTask