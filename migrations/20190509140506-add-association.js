'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const PostHasManyComment = (transaction) => queryInterface.addColumn(
      'Comment',
      'postId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Post',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      { transaction },
    )

    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        PostHasManyComment(t),
      ])
    });
  },

  down: (queryInterface, Sequelize) => {
    const undoPostHasManyComment = (transaction) => queryInterface.removeColumn(
      'Comment',
      'postId',
      { transaction },
    )

    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        undoPostHasManyComment(t),
      ])
    })
  }
};
