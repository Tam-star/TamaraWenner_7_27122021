module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le nom ne peut pas être vide' },
        notNull: { msg: 'Le nom ne peut pas être null' }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le prénom ne peut pas être vide' },
        notNull: { msg: 'Le prénom ne peut pas être null' }
      }
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: 'Ce pseudo est déjà pris'
      },
      validate: {
        notEmpty: { msg: 'Le pseudo ne peut pas être vide' },
        notNull: { msg: 'Le pseudo ne peut pas être null' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: 'Cet email est déjà pris'
      },
      validate: {
        notEmpty: { msg: 'L\'email ne peut pas être vide' },
        notNull: { msg: 'L\'email ne peut pas être null' },
        isEmail: {msg: 'L\'email n\'est pas valide'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le mot de passe ne peut pas être vide' },
        notNull: { msg: 'Le mot de passe ne peut pas être null' }
      }
    },
    rights : {
      type : DataTypes.ENUM('regular','moderator', 'superadmin'),
      allowNull: false,
      defaultValue : 'regular'
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue : ''
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