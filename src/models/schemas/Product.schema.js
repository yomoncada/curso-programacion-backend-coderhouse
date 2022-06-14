const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    thumbnail: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = ProductSchema;