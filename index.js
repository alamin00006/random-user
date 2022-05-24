const express = require('express')
const app = express()
const port = process.env.PORT||5000;
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config()
const stripe = require("stripe")(process.env.SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// machinedb
// KLxxBmspoMOszy09
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = "mongodb+srv://machinedb:KLxxBmspoMOszy09@cluster0.csluy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



function  verifyJWT(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader){
      return res.status(401).send({message: 'UnAthorized access'})
  }
  const token = authHeader.split(' ')[1];
  // console.log(token)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      console.log('decoded',decoded)
      if(err){
          
      return  res.status(403).send({message: "Forbidden access"})
      }
      req.decoded = decoded;
      // console.log(req.decoded)
      next()
    });
  }


async function run() {
  try {
    await client.connect();
    const partsCollection = client.db('allParts').collection('parts');
    const userCollection = client.db('allParts').collection('users');
    const orderCollection = client.db('allParts').collection('order');

    app.get('/parts', async (req, res) =>{
      const query = {};
      const result = await partsCollection.find(query).toArray();
      res.send(result);
    })

    app.post('/order', async (req, res) =>{
      const order = req.body;
      // const query = {customerName: order.customerName}
      // console.log(query)
      // const exists = await orderCollection.findOne(query)
      // if(exists){
      //   return res.send({success: false, order:exists})
      // }
      const result = await orderCollection.insertOne(order);
     return res.send({success: true,result})
    })

    app.get('/order', verifyJWT, async (req, res) =>{
      const customer = req.query.customer;
     const decodedEmail = req.decoded.email;
     if(customer === decodedEmail){
      const query = {customer: customer};
      const order = await orderCollection.find(query).toArray();
     return res.send(order)
     }
     else{
      return  res.status(403).send({message: "Forbidden access"})
     }
      
    })

    // app.post('/create-payment-intent', verifyJWT, async (req, res) =>{
    //   const service = req.body;
    //   console.log(service)
    //   const price = service.price;
    //   const amount = price*100;
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount:amount,
    //     currency: 'usd',
    //     payment_method_types : ['card']

    //   });
    //   res.send({
    //     clientSecret: paymentIntent.client_secret
    //   });

    // })
    app.post('/create-payment-intent', verifyJWT, async(req, res) =>{
      const service = req.body;
      const price = service.price;
      const amount = price*100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount : amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
      res.send({clientSecret: paymentIntent.client_secret})
    });


    app.get('/parts/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result =await partsCollection.findOne(query);
        res.send(result)

  })

  //   app.get('/user', async(req, res) =>{
  //     const users = await userCollection.find().toArray();
  //     res.send(users)
  // })
  app.get('/user' , verifyJWT, async (req, res) =>{
    const user = await userCollection.find().toArray();
    res.send(user)
  })

  app.get('/admin/:email', async (req, res) =>{
    const email = req.params.email;
    console.log('email',email)
    const user = await userCollection.findOne({email:email})
    const isAdmin = user.role === 'admin';
    console.log('admin',user.role)
    res.send({ admin: isAdmin })
  })
  

    app.put('/user/admin/:email', verifyJWT, async(req, res) =>{
      const email = req.params.email;
      const requesterAdmin = req.decoded.email;
      const requesterAccount = await userCollection.findOne({email: requesterAdmin})
      if(requesterAccount.role === 'admin'){
        const filter = {email: email};
    const updateDoc ={
          $set: {role : 'admin'}
      };
      const result = await userCollection.updateOne(filter, updateDoc);
     return res.send(result);
      }
     else{
      return  res.status(403).send({message: "Forbidden access"})
     }
      })

    app.put('/user/:email', async(req, res) =>{
      const email = req.params.email;
      const user = req.body;
      const filter = {email: email};
      const options = {upsert: true}
      const updateDoc ={
          $set: user
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      const token = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      res.send({result, token});
      })

    app.put('/parts/:id', async(req, res) =>{
      const id = req.params.id;
      const updatedQuantity = req.body;
      console.log(updatedQuantity)
      const filter = {_id: ObjectId(id)};
      const options = { upsert: true };
      const updatedFinal = {
          $set: {
            newQuantity:updatedQuantity.quantity
          }
      };
    
      console.log(updatedFinal)
      const result = await partsCollection.updateOne(filter,updatedFinal, options);
      res.send(result);
  
  })



  } finally {
    
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})