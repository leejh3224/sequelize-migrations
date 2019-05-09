'use strict';
const db = require('../models');
const path = require('path');
const constants = require(path.resolve('config/constants.json'));

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
            createdAt: new Date(),
            updatedAt: new Date(),
          }, {
            title: 'post11',
            content: 'cccc',
            status: constants.post.status.draft,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        username: 'John2',
        email: 'demo2@demo.com',
        password: 'Doe2',
        Posts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]

    return Promise.all(users.map(user => {
      return db.User.create(user, {
        include: [db.User.Post]
      });
    }));
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Post', null, {}),
      queryInterface.bulkDelete('User', null, {}),
    ])
  }
};
