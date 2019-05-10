'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const constants = require(path.resolve('config/constants.json'));

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(Object.keys(constants.post.status)),
      allowNull: false,
      defaultValue: constants.post.status.draft,
    }
  }, { 
    tableName: 'Post',
    scopes: {
      longTitle: {
        where: {
          $and: [
            sequelize.where(
              sequelize.fn('CHAR_LENGTH', sequelize.col('content')),
              {
                $gt: 3
              },
            ),
            { 
              content: {
                $substring: 'cc'
              }
            }
          ]
        }
      }
    }
  });
  Post.associate = function(models) {
    Post.Comment = Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE',
    })
    Post.Tag = Post.belongsToMany(models.Tag, {
      as: 'PostTags',
      through: 'PostTag',
      foreignKey: 'postId',
    })
  };
  Post.loadScopes = function(models) {
    Post.addScope('comments', {
      include: [{
        association: Post.Comment,
        required: false,
      }],
    })
  };
  return Post;
};