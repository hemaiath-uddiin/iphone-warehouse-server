const express = require('express'); 
const cors = require('cors');  
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()  
const port = process.env.PORT||5000
const app = express() ;
//middle ware 
  app.use(cors());
  app.use(express.json()) ; 
  
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.iyeky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() { 
  try{ 
    await client.connect(); 
    const iphoneItem = client.db("Iphone").collection('items'); 
     app.get('/item',async(req,res)=>{ 
        const query = {} ;
        const cursor = iphoneItem.find(query); 
        const items = await cursor.toArray() ;
        res.send(items);
     })   
     //latest phone api                       
     const Latest = client.db("Latest").collection('phone'); 
     app.get('/latest',async(req,res)=>{ 
      const query = {} ;
      const cursor = Latest.find(query); 
      const phones = await cursor.toArray() ;
      res.send(phones);
   }) 
     //sigle item get
     app.get('/item/:id',async(req,res)=>{ 
         const id = req.params.id; 
         const query = {_id:ObjectId(id)} ;
         const item =  await iphoneItem.findOne(query)
         res.send(item)
     })
  } 
  finally{ 

  }

} 
run().catch(console.dir);

 app.get('/',(req,res)=>{ 
     res.send("runnig server")
 }) 
 app.listen(port,()=>{ 
     console.log("listening to port ",port);
 })