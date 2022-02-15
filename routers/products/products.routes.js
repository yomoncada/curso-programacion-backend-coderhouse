const express = require('express');
const { products } = require('../../data/data');
const Product = require('../../modules/product');

const product = new Product(products);

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ success: true, result: product.getAll() });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const existingProduct = product.get(id);

  if (!existingProduct) {
    return res.status(404).json({ success: false, error: 'Producto no encontrado' });
  }
  
  return res.json({ success: true, result: existingProduct });
});

router.post('/', (req, res) => {
  const { title, price, thumbnail } = req.body;
  
  if ( !title || !price || !thumbnail) {
    return res.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' });
  }

  const newProduct = {
    title,
    price,
    thumbnail
  };

  const createdProduct = product.add(newProduct);

  return res.json({ success: true, result: createdProduct });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  const existingProduct = product.get(id);

  if (!existingProduct) {
    return res.status(404).json({ success: false, error: 'Producto no encontrado' });
  }

  if ( !title || !price || !thumbnail) {
    return res.status(400).json({ success: false, error: 'Formato del cuerpo incorrecto' });
  };

  const productModification = {
    id,
    title,
    price,
    thumbnail
  };

  const modifiedProduct = product.edit(productModification);

  return res.json({ success: true, result: modifiedProduct});
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const existingProduct = product.get(id);

  if (!existingProduct) {
    return res.status(404).json({ success: false, error: 'Producto no encontrado' });
  }

  product.delete(id);

  return res.json({ success: true, result: 'Producto eliminado' });
});

module.exports = router;