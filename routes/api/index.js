// ROUTES > EXTERNAL ROUTES AND DEPENDENCIES
const router = require('express').Router();
const userRoutes = require('./user-routes');
const authRoutes = require('./authentication-routes');
const tipsRoutes = require('./tips-routes');
const fbauthroutes = require('./passport-fb-auth');
const githubAuthRoutes = require('./passport-github-auth');
const {tips} = require("../../db/db.json");
const { v4: uuidv4 } = require('uuid');

// ROUTERS
router.use('/users', userRoutes);
router.use('/tips', tipsRoutes);
router.use('/fbauth', fbauthroutes );
router.use('/ghauth', githubAuthRoutes);
router.use('/auth', authRoutes);

module.exports = router;