const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT
const sequelize = require('./config/db.js')

app.use(morgan('dev'))
   .use(express.json());


sequelize.initDb()

//Endpoints

app.listen(port, () => console.log('Connectée sur le port', port))