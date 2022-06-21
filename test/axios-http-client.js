const axios = require('axios');

const getProducts = () => {
    try {
        return axios.get('http://localhost:8080/api/products');
    } catch (error) {
        throw new Error(error.message);
    }
}

const createProduct = (data) => {
    try {
        return axios.post(`http://localhost:8080/api/products`, data);
    } catch (error) {
        throw new Error(error.message);
    }
}

const getProduct = (id) => {
    try {
        return axios.get(`http://localhost:8080/api/products/${id}`);
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateProduct = (id, data) => {
    try {
        return axios.put(`http://localhost:8080/api/products/${id}`, data);
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteProduct = (id) => {
    try {
        return axios.delete(`http://localhost:8080/api/products/${id}`);
    } catch (error) {
        throw new Error(error.message);
    }
}

(async () => {
    try {
        console.log('Prueba de la api de productos');
        
        console.log('Obtención de productos');
        const products = await getProducts();
        console.log(products.data);

        if (products.data.success) {
            console.log('✔');
        } else {
            console.log('Error');
        }

        console.log('Obtención de un producto');
        const product = await getProduct(products.data.data[0]._id);
        console.log(product.data);

        if (product.data.success) {
            console.log('✔');
        } else {
            console.log('Error');
        }

        console.log('Creación de un producto');
        const createdProduct = await createProduct({
            title: 'Esto es un producto',
            price: 150,
            thumbnail: 'https://place-hold.it/300x300/'
        });
        console.log(createdProduct.data);

        if (createdProduct.data.success && createdProduct.data.data._id) {
            console.log('✔');
        } else {
            console.log('Error');
        }

        console.log('Actualización de un producto');
        const updatedProduct = await updateProduct(createdProduct.data.data._id, {
            title: 'Esto es un producto modificado',
            price: 350,
            thumbnail: 'https://place-hold.it/150x150/'
        });
        console.log(updatedProduct.data);

        if (updatedProduct.data.success && updatedProduct.data.data.acknowledged) {
            console.log('✔');
        } else {
            console.log('Error');
        }

        console.log('Eliminación de un producto');
        const deletedProduct = await deleteProduct(createdProduct.data.data._id);
        console.log(deletedProduct.data);

        if (deletedProduct.data.success && deletedProduct.data.data.acknowledged) {
            console.log('✔');
        } else {
            console.log('Error');
        }
    } catch (error) {
        throw new Error(error.message);
    }
})()