const { apiErrorResponse } = require('../utils/api.utils');

const errorMiddleware = (error, req, res, next) => {
	const status = error.status || 500;
	const errorItem = {
		message: error.message,
		details: error.details
	};
	const errorResponse = apiErrorResponse(errorItem, status);
	
	return res.status(status).json(errorResponse);
};

module.exports = errorMiddleware;