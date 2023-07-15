const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    const createdPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    if (commentData[createdPost.id]) {
      for (const comment of commentData[createdPost.id]) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        console.log('Creating comment with user_id:', randomUser.id, 'and post_id:', createdPost.id);

        await Comment.create({
          user_id: randomUser.id,
          post_id: createdPost.id,
          content: comment.content,
        });
      }
    }
  }

  process.exit(0);
};

seedDatabase();