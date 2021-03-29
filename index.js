const express = require('express')
const bodyParser = require('body-parser')
const ObjectId=require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wxd1m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 4000





const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("imageUser").collection("data");
    app.get("/events",(req,res)=>{
        collection.find()
        .toArray((err,document)=>{
            res.send(document)
        })
    })

    app.post("/imagesubmit",(req,res)=>{
        const event=req.body
        collection.insertOne(event)
        .then(result=>{
            res.send(result.insertedCount > 0)
        })
    })

    app.delete('/delete/:id',(req,res)=>{
        const id=ObjectId(req.params.id)
        collection.findOneAndDelete({_id:id})
        .then(result=>{
            console.log(result);
            res.redirect("/")
        })
    })

  
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)