const express = require('express');
const authRoutes = require('./auth/auth.routes');
const webRoutes = require('./web/web.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/web', webRoutes);

module.exports = router;