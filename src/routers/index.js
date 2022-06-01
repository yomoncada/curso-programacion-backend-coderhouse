const express = require('express');

const generalRoutes = require('./general/general.routes');
const randomsRoutes = require('./randoms/randoms.routes');
const authRoutes = require('./auth/auth.routes');
const errorRoutes = require('./error/error.routes');
const webRoutes = require('./web/web.routes');

const router = express.Router();

router.use(generalRoutes);
router.use('/randoms', randomsRoutes);
router.use(authRoutes);
router.use(errorRoutes);
router.use(webRoutes);

module.exports = router;