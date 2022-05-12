// ROUTES > EXTERNAL ROUTES AND DEPENDENCIES
const router = require('express').Router();
const userRoutes = require('./user-routes');
const {tips} = require("../../db/db.json");
router.use('/users', userRoutes);


//ROUTES > GET ALL EXISTING TIPS
router.get("/tips", (req, res) => {
    let results = tips;
    res.json(results);
});

module.exports = router;