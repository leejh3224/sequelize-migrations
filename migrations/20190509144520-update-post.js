'use strict';
const path = require('path');
const constants = require(path.resolve('config/constants.json'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Post', 'status', {
          type: Sequelize.ENUM(Object.keys(constants.post.status)),
          allowNull: false,
          defaultValue: constants.post.status.draft,
        }, { transaction: t }),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Post', 'status', { transaction: t }),
      ])
    })
  }
};
