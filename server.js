require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

mongoose.connect(process.env.CONNECTIONSTRING)
.then(()=> app.emit('Conectado'))
.catch((err)=> console.err(err))


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)

app.on('Conectado',()=>{
    app.listen(3000, ()=>{
        console.log('Servidor ligado')
        console.log('Acessar http://localhost:3000');
    })
})