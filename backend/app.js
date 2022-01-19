require('dotenv').config({ path: './config/.env' })

const express = require('express')
const helmet = require("helmet");
const cookieParser = require('cookie-parser')
const path = require('path');
const morgan = require('morgan')



const app = express()
const port = process.env.PORT
const sequelize = require('./config/db.js')

//Routes
const userRoutes = require('./routes/user.route')
const postRoutes = require('./routes/post.route')
const commentRoutes = require('./routes/comment.route')

app.use(morgan('dev'))
   .use(cookieParser())
   .use(express.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, ');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      next();
   })
   .use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }))


sequelize.initDb()

//Endpoints
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/images/users', express.static(path.join(__dirname, 'images/users')));
app.use('/images/posts', express.static(path.join(__dirname, 'images/posts')));
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

//In case the endpoint does not exist
app.use(({ res }) => {
   const message = 'Impossible de trouver la ressource demandée. Essayez une autre URL'
   res.status(404).json({ message })
})

app.listen(port, () => console.log('Connectée sur le port', port))