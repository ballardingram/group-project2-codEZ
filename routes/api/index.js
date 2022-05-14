// ROUTES > EXTERNAL ROUTES AND DEPENDENCIES
const router = require('express').Router();
const userRoutes = require('./user-routes');
const authRoutes = require('./authentication-routes');
const tipsRoutes = require('./tips-routes');

const {tips} = require("../../db/db.json");
const { v4: uuidv4 } = require('uuid');

// ROUTERS
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/tips', tipsRoutes);


//ROUTES > GET ALL EXISTING TIPS
router.get("/tips", (req, res) => {
    let results = tips;
    res.json(results);
});

// ROUTES > POST WITH UUIDV4 INTEGRATED FOR TIP IDS
router.post("/tips", (req,res) => {
    req.body.id = uuidv4();
    const newTip = createNewTip(req.body, tips);
    res.json(newTip);
});

module.exports = router;