'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING
  }, { tableName: 'Comment' });
  Comment.associate = function(models) {
    Comment.Post = Comment.belongsTo(models.Post)
  };
  return Comment;
};