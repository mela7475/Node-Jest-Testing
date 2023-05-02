const request = require('supertest');
const app = require('./app');
const books = require('./utils/data');

describe('POST /users', () => {
    describe('given a username and password', () => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password',
            });
            expect(response.statusCode).toBe(200);
        });
        test('should specify json in the content type header', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password',
            });
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });
        test('response has userId', async () => {
            const response = await request(app).post('/users').send({
                username: 'username',
                password: 'password',
            });
            expect(response.body.userId).toBeDefined();
        });
    });

    describe('when the user and password is missing', () => {
        test('should respond with a status code of 400', async () => {
            const bodyData = [
                { username: 'username' },
                { password: 'password' },
                {},
            ];
            for (const body of bodyData) {
                const response = await request(app).post('/users').send(body);
                expect(response.statusCode).toBe(400);
            }
        });
    });
});

describe('Get all products - GET /products', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/products');
        expect(response.statusCode).toBe(200);
    });
});

describe('Get individual product - GET /products/:id', () => {
    test('should respond with a 200 status code', async () => {
        const productId = 1;
        const response = await request(app).get(`/products/${productId}`);
        expect(response.statusCode).toBe(200);
    });
    test('should respond with a 404 status code', async () => {
        const productId = 12;
        const response = await request(app).get(`/products/${productId}`);
        expect(response.statusCode).toBe(404);
    });
});

describe('Create new product - POST /products', () => {
    test('should respond with a 201 status code', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                id: books.length + 1,
                title: 'title',
                author: 'author',
                finished: true,
                createdAt: new Date(),
            });
        expect(response.statusCode).toBe(201);
    });
});

describe('Update product - PUT /products', () => {
    test('should respond with a 204 status code', async () => {
        const productId = 1;
        const response = await request(app).put(`/products/${productId}`).send({
            id: 1,
            title: 'title',
            author: 'author',
            finished: true,
            createdAt: new Date(),
        });
        expect(response.statusCode).toBe(204);
    });
    test('should respond with a 404 status code', async () => {
        const productId = 15;
        const response = await request(app).put(`/products/${productId}`).send({
            id: 1,
            title: undefined,
            author: undefined,
            finished: undefined,
            createdAt: new Date(),
        });
        expect(response.statusCode).toBe(404);
    });
});

describe('Delete product - Delete /products', () => {
    test('should respond with a 204 status code', async () => {
        const productId = 1;
        const response = await request(app).put(`/products/${productId}`);
        expect(response.statusCode).toBe(204);
    });
    test('should respond with a 404 status code', async () => {
        const productId = 15;
        const response = await request(app).put(`/products/${productId}`);
        expect(response.statusCode).toBe(404);
    });
});
