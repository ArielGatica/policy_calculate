const express = require('express');
const morgan = require('morgan');
const polizaRoutes = require('./routes/routes');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Policy Routes
app.use('/api/v1', polizaRoutes);

// App Running Port
app.listen(3000, () => console.log('Api Running port: 3000'));