const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();
app.use(cors())
app.use(express.json())

const uri  = "mongodb+srv://admin:admin@cluster0.bauhtep.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const db = client.db("DB02");
const col = db.collection("Col1");

app.post('/', (req, res)=>{
    console.log(req.body);
    col.insertOne(req.body);
    res.send("Insert Successful......")
})

app.get('/products',async (req,res) => {
    const result = await col.find({}).toArray();
    console.log(result);
    res.send(result);
})

app.delete('/delete/:id',async (req,res) => {
    const pid = req.params.id;
    const result = await col.deleteOne({id : pid});
    console.log(result);
    res.send(result);
})




app.listen(8888);
console.log("Server started at 8888");
