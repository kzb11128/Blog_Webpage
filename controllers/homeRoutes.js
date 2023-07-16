const router = require('express').Router();
const { Post, User, Comment} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try{
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard'); 
        return;
      }
    
    res.render('signup');
});

router.get("/dashboard", withAuth, async (req, res) => {
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id, 
            },
        });
        const userData = await User.findByPk(req.session.user_id);

        const posts = postData.map((post) => post.get({plain: true}));
        const user = userData.get({plain: true});

        res.render("dashboard", {
            posts,
            user,
            logged_in: req.session.logged_in,
        });
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          }
        ],
      });

      const commentData = await Comment.findAll({
        where: {
          post_id: req.params.id
        },
        include: [
          {
            model: User,
            attributes: ['name'],
          }
        ]
      });
  
      const post = postData.get({ plain: true });
      const comments = commentData.map((comment) => comment.get({plain: true}));
  
      res.render('post', {
        ...post,
        comments,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get("/createPost", withAuth, (req, res) => {
  res.render("newPost");
});

router.get("/updatePost/:id", withAuth, async (req, res) => {
  try{
    const postData = await Post.findByPk(req.params.id);
    if(!postData){
      res.status(404).json({message: "No posts with this id number!"});
      return;
    }
    const post = postData.get({ plain: true });
    res.render("updatePost", {
      ...post,
      logged_in: req.session.logged_in
    })
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;

