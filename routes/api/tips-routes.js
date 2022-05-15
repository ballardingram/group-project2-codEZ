const router = require('express').Router();
const {Tips, User } = require('../../models');
const sequelize = require('../../config/connection');
const { rawAttributes } = require('../../models/users');

// ROUTES > ALL TIPS, ALL USERS
router.get('/', (req, res) => {
    Tips.findAll({
        attributes: ['id', 'tip_title', 'tip_detail', 'tip_language', 'username'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTipsData => res.json(dbTipsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ROUTES > GET TIP BY TIP_TITLE
router.get('/:tip_title', (req, res) => {
    Tips.findOne({
        where: {
            tip_title: req.params.tip_title
        },
        attributes: ['id', 'tip_title', 'tip_detail', 'tip_language', 'username'],
        order: ['tip_language', 'tip_title', 'tip_detail', 'username'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTipsData => {
        if (!dbTipsData) {
            res.status(404).json({message: 'No tip found with this title.'});
            return;
        }
        res.json(dbTipsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ROUTES > CREATE A TIP
router.post('/', (req, res) => {
    Tips.create({
        id: req.body.id,
        tip_title: req.body.tip_title,
        tip_detail: req.body.tip_detail,
        tip_language: req.body.tip_language,
        username: req.body.username
    })
    .then(dbTipsData => res.json(dbTipsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ROUTES > DELETE A TIP
router.delete('/:tip_title', (req,res) => {
    Tips.destroy ({
        where: {
            tip_title: req.params.tip_title
        }
    })
    .then(dbTipsData => {
        if(!dbTipsData) {
            res.status(404).json({message: 'OPERATION FAILED. Unable to delete a tip with that title.'});
            return;
        }
        res.json(dbTipsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;