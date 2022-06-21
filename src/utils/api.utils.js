const constants = require('./constants/api.constants');

const formatErrorObject = (error, message) => ({
	error,
	message
});

const apiSuccessResponse = (status, data) => ({
	error: false,
	statusTag: status.tag,
	statusCode: status.code,
	data
});

const apiErrorResponse = (error) => {
	const statusItem = Object.keys(constants.STATUS)
		.find(status => status.tag === error.error);

	return {
		error: true,
		statusTag: statusItem.tag,
		statusCode: statusItem.code,
		message: error.message
	}
};

module.exports = {
	formatErrorObject,
	apiSuccessResponse,
	apiErrorResponse
}