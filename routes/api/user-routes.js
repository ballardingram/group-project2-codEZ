const router = require('express').Router();
const {User} = require('../../models/users');

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
router.get('/:username', (req, res) => {
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

// DELETE > USER
router.delete('/:username', (req, res) => {
    User.destroy({
        where: {
            username: req.params.username
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'OPERATION FAILED! Cannot delete user that does not exist.'});
            return;
        }
        res.json(dbUserData);
    })
    .cathc(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// VALIDATION > STANDARD LOGIN
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({message: 'USERNAME not found.'});
            return;
        }
        const validPW = dbUserData.checkPassword(req.body.password);

        if(!validPW) {
            res.status(400).json({ message: 'Incorrect Password. Try again.'});
            return;
        }
        res.json({user: dbUserData, message: 'Log In Successful!'});
        return;
    });
});

module.exports = router;