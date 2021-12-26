require('dotenv').config({ path: './config/.env' })

const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT
const sequelize = require('./config/db.js')

//Routes
const userRoutes = require('./routes/user.route')
const postRoutes = require('./routes/post.route')

app.use(morgan('dev'))
   .use(express.json());


sequelize.initDb()

//Endpoints
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.listen(port, () => console.log('Connectée sur le port', port))