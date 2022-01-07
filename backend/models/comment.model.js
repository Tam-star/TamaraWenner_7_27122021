module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le postId ne peut pas être vide' },
                notNull: { msg: 'Le postId ne peut pas être null' }
            },
            references: {
                model: 'posts', // 'posts' refers to table name
                key: 'id', // 'id' refers to column name in posts table
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'userId ne peut pas être vide' },
                notNull: { msg: 'L\'userId ne peut pas être null' }
            },
            references: {
                model: 'users', // 'users' refers to table name
                key: 'id', // 'id' refers to column name in users table
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}