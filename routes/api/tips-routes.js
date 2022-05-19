const router = require('express').Router();
const {Tips, User } = require('../../models');
const sequelize = require('../../config/connection');
const { rawAttributes } = require('../../models/users');

// ROUTES > ALL TIPS, ALL USERS
router.get('/', (req, res) => {
    Tips.findAll({
        attributes: ['id', 'tip_title', 'tip_detail', 'tip_language', 'userid'],
        include: [
            {
                model: User,
                attributes: ['id', 'first_name','last_name', 'email']
            }
        ],
        raw: true,
        nest: true,
    })
    .then(dbTipsData => {
        console.log(dbTipsData);
        res.render('index', {tips: dbTipsData});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/languages', (req, res) => {
    Tips.aggregate('tip_language','DISTINCT', { plain: false })
    .then(dbTipsData => 
        {
            let languages = dbTipsData.map(tip => tip.DISTINCT);
         res.json(languages)
        })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/language/:name', (req, res) => {
    Tips.findAll({
        attributes: ['id', 'tip_title', 'tip_detail', 'tip_language', 'userid'],
        include: [
            {
                model: User,
                attributes: ['id', 'first_name','last_name', 'email']
            }
        ],
        where : {
            tip_language : req.params.name
        }  ,
        raw: true,
        nest: true,      
    }
    ).then(dbTipsData => {
        if (!dbTipsData) {
            res.status(404).json({message: 'No tip found with this title.'});
            return;
        }
        res.render('languagetips', {tips: dbTipsData});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/usertips/:userid',checkAuthentication, (req, res) => {
    Tips.findAll({
        attributes: ['id', 'tip_title', 'tip_detail', 'tip_language', 'userid'],
        include: [
            {
                model: User,
                attributes: ['id', 'first_name','last_name', 'email']
            }
        ],
        where : {
            userid : req.params.userid
        }    ,
        raw: true,
        nest: true,     
    }
    ).then(dbTipsData => {
        if (!dbTipsData) {
            res.status(404).json({message: 'No tip found with this title.'});
            return;
        }
        res.render('index', {tips:dbTipsData});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ROUTES > GET TIP BY TIP_ID
router.get('/:id', (req, res) => {
    Tips.findOne({
        where: {
            id: req.params.id
        },include: [
            {
                model: User,
                attributes: ['id', 'first_name','last_name', 'email']
            }
        ] ,
        raw: true,
        nest: true, 
        attributes: ['id', 'tip_title', 'tip_detail', 'tip_language', 'userid'],
        order: ['tip_language', 'tip_title', 'tip_detail', 'userid'],
        
    })
    .then(dbTipsData => {
        if (!dbTipsData) {
            res.status(404).json({message: 'No tip found with this title.'});
            return;
        }
        res.render('tip', {tip: dbTipsData});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ROUTES > CREATE A TIP
router.post('/', checkAuthentication, (req, res) => {
    console.log('we came to submit a tip');
    console.log(req.body);
    Tips.create({
        tip_title: req.body.tip_title,
        tip_detail: req.body.tip_detail,
        tip_language: req.body.tip_language,
        userid: req.session.passport.user.id
    } 
    )
    .then(dbTipsData => 
        {console.log(dbTipsData.get({plain:true}));
        res.render('tip', {tip: dbTipsData.get({plain:true})})}
        ).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ROUTES > DELETE A TIP
router.delete('/:id', checkAuthentication, (req,res) => {
    Tips.destroy ({
        where: {
            id: req.params.id
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


function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/login");
    }
  }

  
module.exports = router;