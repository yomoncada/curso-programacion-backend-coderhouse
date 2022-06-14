const express = require('express');
const errorMiddleware = require('../middlewares/error.middleware');

const generalRoutes = require('./general/general.routes');
const randomsRoutes = require('./randoms/randoms.routes');
const authRoutes = require('./auth/auth.routes');
const errorRoutes = require('./error/error.routes');
const webRoutes = require('./web/web.routes');

const router = express.Router();

router.use(generalRoutes.initialize());
router.use('/randoms', randomsRoutes.initialize());
router.use(authRoutes.initialize());
router.use(errorRoutes.initialize());
router.use(webRoutes.initialize());

router.use(errorMiddleware);

module.exports = router;