module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.STRING
    },
    registration_date: {
      type: DataTypes.DATEONLY
    }
  }, {
    timestamps: false // Disable automatic timestamps
  });
  
  return User;
};
