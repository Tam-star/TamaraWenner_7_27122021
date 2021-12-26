const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('../models/user.model')
const PostModel = require('../models/post.model')
require('dotenv').config({ path: './config/.env' })

const sequelize = new Sequelize('groupomania', `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.HOST}`,
    dialect: 'mysql',
    logging: false
})

const User = UserModel(sequelize, DataTypes)
const Post = PostModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {

        User.create({
            pseudo: 'J-P',
            email: 'jp@gmail.com',
            password: '1234'
        }).then(user => console.log(user.toJSON()))


        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, User, Post
}