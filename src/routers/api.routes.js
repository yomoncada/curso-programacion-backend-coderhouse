const express = require('express');
const randomsRoutes = require('./randoms/randoms.routes');

const router = express.Router();

router.use('/randoms', randomsRoutes);

module.exports = router;