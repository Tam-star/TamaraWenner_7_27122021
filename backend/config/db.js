const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('../models/user.model')
const PostModel = require('../models/post.model')
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

// User.hasMany(Post, {foreignKey: 'userId', sourceKey: 'id'});
// Post.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        
        users.map(user => {
            User.create({
                pseudo: user.pseudo,
                email: user.email,
                password: user.password
            }).then(user => console.log(user.toJSON()))
        })

        posts.map(post => {
            Post.create({
                text: post.text,
                userId: post.userId,
                usersLiked : post.usersLiked
            }).then(post => console.log(post.toJSON()))
        })
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, User, Post
}