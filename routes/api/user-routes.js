const router = require('express').Router();
const passport = require('../../passport');
const { User } = require('../../models');

// GET > SINGLE USER *BY USERNAME*
router.get('/:username', (req, res) => {
  console.log("we came to get user "+req.params.username);
  User.findOne({
      attributes: { exclude: ['password']},
      where: {
          username: req.params.username
      }
  })
  .then(dbUserData => {
      if(!dbUserData) {
          res.status(404).json({message: 'No user found with this username.'});
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// POST > USER
router.post('/', (req, res) => {
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});


module.exports = router;