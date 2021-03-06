const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('../models/user.model')
const PostModel = require('../models/post.model')
const CommentModel = require('../models/comment.model')
require('dotenv').config({ path: './config/.env' })


const sequelize = new Sequelize('groupomania', `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.HOST}`,
    dialect: 'mysql',
    logging: false
})

const User = UserModel(sequelize, DataTypes)
const Post = PostModel(sequelize, DataTypes)
const Comment = CommentModel(sequelize, DataTypes)


const initDb = () => {
    return sequelize.sync().then(_ => {
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, User, Post, Comment
}