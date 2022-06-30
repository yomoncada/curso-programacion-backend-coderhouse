const express = require('express');
const errorMiddleware = require('../middlewares/error.middleware');

const GeneralRoutes = require('./general/general.routes');
const RandomsRoutes = require('./randoms/randoms.routes');
const ProductsRoutes = require('./products/products.routes');
const GraphQLRoutes = require('./graphql/graphql.routes');
const AuthRoutes = require('./auth/auth.routes');
const ErrorRoutes = require('./error/error.routes');
const WebRoutes = require('./web/web.routes');

const router = express.Router();

router.use(GeneralRoutes.initialize());
router.use(RandomsRoutes.initialize('/randoms'));
router.use(ProductsRoutes.initialize('/api/products'));
router.use(GraphQLRoutes.initialize());
router.use(AuthRoutes.initialize());
router.use(ErrorRoutes.initialize());
router.use(WebRoutes.initialize());

router.use(errorMiddleware);

module.exports = router;