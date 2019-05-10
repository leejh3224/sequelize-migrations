const express = require('express');
const db = require('../models');

const app = express();

app.listen(3000, async () => {
  const users = await db.User.findAll();
  const posts = await db.Post.scope('comments').findAll();
  const posts2 = await db.Post.findAll();
  const postWithLongTitle = await users[1].getPosts({ scope: 'longTitle' });
  console.log(await posts[0].getComments()); // comments exists
  console.log(await posts2[0].getComments()); // comments doesn't exists
  console.log(`listening to ${3000}`);
})
