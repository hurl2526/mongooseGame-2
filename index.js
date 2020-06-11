//npm i -g nodeman
//npm i dotenv
//nom i express
//npm run dev

const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const uuid = require('uuidv4');
const mongoose = require('mongoose')
require('dotenv').config()


const snark = require('./middlewares/snark')

const gameRouter = require('./routes/gameRoutes')

const port = process.env.PORT || 8080
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>console.log('mongodb created'))
.catch((err)=> console.log(`mongo error: ${err}`))

app.use(snark)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/v1/games', gameRouter)


app.listen(port,()=>{
  console.log(`Listening on port ${port}`)
})