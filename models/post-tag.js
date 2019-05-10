'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {

  }, { tableName: 'PostTag', timestamps: false });

  return PostTag;
};