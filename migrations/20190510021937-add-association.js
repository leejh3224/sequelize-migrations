'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostTag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Post',
          key: 'id',
        }
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tag',
          key: 'id',
        }
      },
    }, { timestamps: false });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostTag');
  }
};
