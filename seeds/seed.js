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

    const numComments = Math.floor(Math.random() * 10); 

    for (let i = 0; i < numComments; i++) {
      await Comment.create({
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: createdPost.id,
        content: 'This is a comment.', 
      });
    }
  }
  process.exit(0);
};

seedDatabase();
