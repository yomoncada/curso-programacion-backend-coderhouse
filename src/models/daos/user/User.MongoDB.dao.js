const MongoDBContainer = require("../../containers/MongoDB.container");
const UserSchema = require('../../schemas/User.schema');
const { formatErrorObject } = require('../../../utils/api.utils');
const apiConstants = require('../../../utils/constants/api.constants');

const { 
	STATUS: { 
		INTERNAL_ERROR,
		NOT_FOUND
	}
} = apiConstants;

class UserMongoDBDAO extends MongoDBContainer {
	static instance;
	
	constructor() {
		if (!UserMongoDBDAO.instance) {
			super('users', UserSchema);
			UserMongoDBDAO.instance = this;
			return this;
		} else {
			return UserMongoDBDAO.instance;
		}
	}

	async getByEmail(email) {
		try {
			const user = await this.model.findOne({ email }, { __v: 0 }).lean();
			
			if (!user) {
				const errorMessage = `Wrong username or password`;
				const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
				throw new Error(JSON.stringify(newError));
			} else {
				return user;
			}
		} catch(error) {
			const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
			throw new Error(JSON.stringify(newError));
		}
	}
}

module.exports = UserMongoDBDAO;