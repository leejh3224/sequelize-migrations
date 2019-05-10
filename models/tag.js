'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { tableName: 'Tag' });
  Tag.associate = function(models) {
    Tag.Post = Tag.belongsToMany(models.Post, {
      as: 'TaggedPosts',
      through: 'PostTag',
      foreignKey: 'tagId',
    });
  };
  return Tag;
};