const router = require('express').Router();
const passport = require('passport')
// router.get('/profile', passport.authenticationMiddleware(), renderProfile)
  

router.post('/login', (req, res) => {
    res.JSON("This is good")
  });
module.exports = router;