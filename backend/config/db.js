const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model')
const PostModel = require('../models/post.model')
const CommentModel = require('../models/comment.model')
require('dotenv').config({ path: './config/.env' })
const posts = require('./mock-posts')
const users = require('./mock-users')


const sequelize = new Sequelize('groupomania', `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.HOST}`,
    dialect: 'mysql',
    logging: false
})

const User = UserModel(sequelize, DataTypes)
const Post = PostModel(sequelize, DataTypes)
const Comment = CommentModel(sequelize, DataTypes)


const initDb = () => {
    return sequelize.sync({force:true}).then(_ => {
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, User, Post, Comment
}