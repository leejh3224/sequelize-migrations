'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { tableName: 'User' });
  User.associate = function(models) {
    User.Post = User.hasMany(models.Post, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return User;
};