const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const GraphQLService = require('../../services/graphql.services')

const schema = buildSchema(`
	type Product {
		_id: ID!,
		title: String,
		price: String,
		thumbnail: String
	}
	input ProductInput {
		title: String,
		price: String,
		thumbnail: String
	}
	type Query {
		getProducts: [Product]
		getProductById(_id: ID!): Product
	}
	type Mutation {
		createProduct(data: ProductInput): Product
		updateProductById(_id: ID!, data: ProductInput): Product
		deleteProductById(_id: ID!): Product
	}
`);

class GraphQLRoutes {
	constructor() {
	  	this.service = new GraphQLService();
	}

	initialize(prefix = "") {
		const getProducts = this.service.getProducts;
		const getProductById = this.service.getProductById;
		const createProduct = this.service.createProduct;
		const updateProductById = this.service.updateProductById;
		const deleteProductById = this.service.deleteProductById;

		return graphqlHTTP({
			schema,
			rootValue: {
				getProducts,
				getProductById,
				createProduct,
				updateProductById,
				deleteProductById
			},
			graphiql: true
		});
	}
}

module.exports = new GraphQLRoutes();