'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const UserHasManyPost = (transaction) => queryInterface.addColumn(
      'Post',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'User', // name of Target model
          key: 'id', // key in Target model that we're referencing
          onDelete: 'CASCADE',
        },
      },
      { transaction },
    );

    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        UserHasManyPost(t),
      ])
    });
  },

  down: (queryInterface, Sequelize) => {
    const undoUserHasManyPost = (transaction) => 
      queryInterface.removeColumn(
        'Post',
        'userId',
        { transaction }
      )

    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        undoUserHasManyPost(t),
      ])
    })
  }
};
