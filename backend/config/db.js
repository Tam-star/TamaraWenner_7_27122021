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

// User.hasMany(Post, {foreignKey: 'userId', sourceKey: 'id'});
// Post.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

const initDb = () => {
    return sequelize.sync({force : true}).then(_ => {

        // users.map(user => {
        //     //bcrypt.hash(user.password, 10)
        //        // .then(hash => {
        //             User.create({
        //                 lastname: user.lastname,
        //                 firstname: user.firstname,
        //                 pseudo: user.pseudo,
        //                 email: user.email,
        //                 password: user.password
        //             }).then(user => console.log(user.toJSON()))
        //             .catch(error => console.log(error))
        //         //})
        //         .catch(error => console.log(error))

        // })

        // posts.map(post => {
        //     Post.create({
        //         text: post.text,
        //         userId: post.userId,
        //         usersLiked: post.usersLiked
        //     }).then(post => console.log(post.toJSON()))
        //     .catch(error => console.log(error))
        // })
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, User, Post, Comment
}