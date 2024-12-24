const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;
      res.status(201).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user || !(await user.checkPassword(req.body.password))) {
      res.status(400).json({ message: 'Invalid username or password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.loggedIn = true;
      res.status(200).json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json({success:true}).end();
    });
  } else {
    res.status(404).json({success:false}).end();
  }
});

module.exports = router;