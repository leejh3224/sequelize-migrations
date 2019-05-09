'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('User', 'email', {
          type: Sequelize.STRING,
          allowNull: false,
        }, { transaction: t }),
        queryInterface.addColumn('User', 'password', {
          type: Sequelize.STRING,
          allowNull: false,
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('User', 'email', { transaction: t }),
        queryInterface.removeColumn('User', 'password', { transaction: t })
      ])
    })
  }
};
