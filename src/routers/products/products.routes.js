const { Router } = require('express');
const ProductControllers = require('../../controllers/product.controllers');

const user = {
  	isAdmin: true
};

const isAdmin = (req, res, next) => {
	if (user.isAdmin) {
		next();
	} else {
		res.status(403).json({error: -1, description: `ruta ${req.originalUrl} método ${req.method} no autorizada`});  
	}
};

const router = new Router();

class ProductRoutes {
	constructor() {
		this.controller = new ProductControllers();
	}

  	initialize(prefix = "") {
		router.route(`${prefix}/`)
			.get(this.controller.getProducts)
			.post(isAdmin, this.controller.createProduct);

		router.route(`${prefix}/:id`)
			.get(this.controller.getProductById)
			.put(isAdmin, this.controller.updateProductById)
			.delete(isAdmin, this.controller.deleteProductById);

		return router;
	}
}

module.exports = new ProductRoutes();