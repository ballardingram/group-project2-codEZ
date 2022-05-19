const router = require('express').Router();
const { User } = require('../../models');


// GET > ALL USERS
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET > SINGLE USER *BY USERNAME*
router.get('/:userid', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.userid
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

// DELETE > USER
router.delete('/:userid', (req, res) => {
    User.destroy({
        where: {
            id: req.params.userid
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'OPERATION FAILED! Cannot delete user that does not exist.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/:userid', checkAuthentication,(req, res) => {
    User.update(
        {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
        },
        {
        where: {
            id: req.params.userid
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'OPERATION FAILED! Cannot delete user that does not exist.'});
            return;
        }
             
        req.session.passport.user.first_name = req.body.firstname;
        req.session.passport.user.last_name = req.body.lastname
        res.redirect('/account');
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/login");
    }
  }
  

module.exports = router;