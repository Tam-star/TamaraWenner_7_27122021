module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      imageUrl: {
        type: DataTypes.STRING
      },
      //Nombre de personnes qui ont liké le post
      usersLiked : {
        type : DataTypes.STRING,
        defaultValue : ''
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