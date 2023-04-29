const client = require("./conectonSql")
const getTaskList = async () => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const db = await client.db('test');
        console.log("You successfully connected to MongoDB");

        let res = await db.collection("task").find({}).toArray();
        console.log(res)
        await client.close()
        return res
    }catch (e){
        await client.close()
        console.log(e)
    }

}
module.exports = getTaskList