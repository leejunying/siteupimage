const express= require('express')
const cors = require('cors')
const bodyaprser=require('body-parser')
const app =express()
const Controller=require('./controller')
 var corsOptions = {
    origin: "http://localhost:3000", // Chang front end domain
    optionsSuccessStatus: 200, 
    credentials: true,
};

 app.use(cors(corsOptions))
 app.use(bodyaprser.json())


 app.post('/upload', async (req, res) =>{
   
 

  let add =  await Controller.addImage(req.body['image'])

 


})

app.get('/load',async(req,res)=>{

  let get = await Controller.getImages()

  res.send(get)


})

 

app.listen(process.env.PORT || 4000,()=>{


    console.log('server is online on port 4000')

}) // Change back-end domain