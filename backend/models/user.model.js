module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: 'Ce pseudo est déjà pris'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: 'Cet email est déjà pris'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT
    }, 
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}