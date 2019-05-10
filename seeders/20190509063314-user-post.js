'use strict';
const path = require('path');
const constants = require(path.resolve('config/constants.json'));

const db = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [
      {
        username: 'John',
        email: 'demo@demo.com',
        password: 'Doe',
        Posts: [
          {
            title: 'post1',
            content: 'cccc',
            status: constants.post.status.draft,
            comments: [
              {
                content: 'hello world',
              }
            ],
          }, {
            title: 'post11',
            content: 'cccc',
            status: constants.post.status.draft,
            comments: [],
          },
        ],
      }, {
        username: 'John2',
        email: 'demo2@demo.com',
        password: 'Doe2',
        Posts: [],
      }
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
