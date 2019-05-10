'use strict';
const path = require('path');
const constants = require(path.resolve('config/constants.json'));

const db = require('../models');
const buildSeedObject = require('../helpers/buildSeedObject');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [
      buildSeedObject({
        username: 'John',
        email: 'demo@demo.com',
        password: 'Doe',
        Posts: [
          buildSeedObject({
            title: 'post1',
            content: 'cccc',
            status: constants.post.status.draft,
            comments: [
              buildSeedObject({
                content: 'hello world',
              })
            ],
          }), buildSeedObject({
            title: 'post11',
            content: 'cccc',
            status: constants.post.status.draft,
            comments: [],
          }),
        ],
      }), buildSeedObject({
        username: 'John2',
        email: 'demo2@demo.com',
        password: 'Doe2',
        Posts: [],
      })
    ]

    return Promise.all(users.map(user => {
      return db.User.create(user, {
        include: [
          {
            model: db.Post,
            required: false,
            include: [{
              model: db.Comment,
              required: false,
              as: 'comments',
            }],
          }
        ]
      });
    }));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Comment', null, {}),
      queryInterface.bulkDelete('Post', null, {}),
      queryInterface.bulkDelete('User', null, {}),
    ])
  }
};
