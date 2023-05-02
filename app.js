const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

module.exports = app;
