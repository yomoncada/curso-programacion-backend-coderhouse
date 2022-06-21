const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;

let productId = '';

describe('Prueba de la api de productos', () => {
    describe('[GET]', () => {
        it('(api/products) - Obtención de productos', async () => {
            const response = await request.get('/api/products');
            console.log(response.body);

            expect(response.status).to.eql(200);
            expect(response.body.success).to.eql(true);

            productId = response.body.data[0]._id;
        });

        it('(api/products/:id) - Obtención de un producto', async () => {
            const response = await request.get(`/api/products/${productId}`);
            console.log(response.body);

            expect(response.status).to.eql(200);
            expect(response.body.success).to.eql(true);
        });
    });

    describe('[POST]', () => {
        it('(api/products) - Creación de un producto', async () => {
            const product = {
                title: 'Esto es un producto',
                price: 150,
                thumbnail: 'https://place-hold.it/300x300/'
            };

            const response = await request.post('/api/products').send(product);
            console.log(response.body);
            
            expect(response.status).to.eql(200);
            expect(response.body.success).to.eql(true);

            productId = response.body.data._id;
        });
    });

    describe('[PUT]', () => {
        it('(api/products) - Actualización de un producto', async () => {
            const product = {
                title: 'Esto es un producto modificado',
                price: 350,
                thumbnail: 'https://place-hold.it/150x150/'
            };

            const response = await request.put(`/api/products/${productId}`).send(product);
            console.log(response.body);
            
            expect(response.status).to.eql(200);
            expect(response.body.success).to.eql(true);
            expect(response.body.data.acknowledged).to.eql(true);
        });
    });

    describe('[DELETE]', () => {
        it('(api/products) - Eliminación de un producto', async () => {
            const response = await request.delete(`/api/products/${productId}`);
            console.log(response.body);
            
            expect(response.status).to.eql(200);
            expect(response.body.success).to.eql(true);
            expect(response.body.data.acknowledged).to.eql(true);
        });
    });
})