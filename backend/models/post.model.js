module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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