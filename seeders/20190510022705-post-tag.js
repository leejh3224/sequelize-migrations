'use strict';
const path = require('path');
const constants = require(path.resolve('config/constants.json'));
const db = require('../models');
const buildSeedObject = require('../helpers/buildSeedObject');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = [
      buildSeedObject({
        title: 'post1',
        content: 'cccc',
        status: constants.post.status.draft,
      }), buildSeedObject({
        title: 'post11',
        content: 'cccc',
        status: constants.post.status.draft,
        PostTags: [
          buildSeedObject({
            name: 'ddd'
          }),
          buildSeedObject({
            name: 'sss'
          })
        ]
      }),
    ]

    return Promise.all(posts.map(post => {
      return db.Post.create(post, {
        include: [{
          association: db.Post.Tag,
          as: 'PostTags',
        }]
      })
    }))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Comment', null, {}),
      queryInterface.bulkDelete('Tag', null, {}),
      queryInterface.bulkDelete('Post', null, {}),
      queryInterface.bulkDelete('PostTag', null, {}),
    ])
  }
};
