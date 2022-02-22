const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const Product = require('./model/Product');
const PORT = process.env.PORT || 8080;

const app = express();
const products = new Product([]);

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}));

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/productos', (req, res) => {
    const items = products.getAll();
    const list = items.length > 0;
    res.render('productList', {products: items, list});
});

app.post('/productos', (req, res) => {
    products.add(req.body);
    res.redirect('/');
});

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});