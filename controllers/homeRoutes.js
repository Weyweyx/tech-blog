const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    console.log (req.session)
    console.log ("posts", posts)

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      user: req.session
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res)=>{
  res.render('login')
})

router.get('/signup', async (req, res)=>{
  res.render('signup')
})

router.get('/logout', async (req, res)=>{
  res.render('logout')
})

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log ("posts", posts)

    res.render('dashboard2', {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;