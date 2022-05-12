const router = require('express').Router();
const passport = require('passport')
router.get('/profile', passport.authenticationMiddleware(), renderProfile)
  

router.post('/login', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    Category.findAll({
      include:[
        {model: Product}
      ]
    })
    .then(dbCategoriesData => res.json(dbCategoriesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
module.exports = router;