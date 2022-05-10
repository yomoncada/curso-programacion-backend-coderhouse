const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    thumbnail: { type: String },
});

module.exports = ProductSchema;