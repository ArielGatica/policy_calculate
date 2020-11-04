const express = require('express');
const ApiRoutes = express.Router();
const { policyCalculate } = require('../controllers/polizaSeguro.controller');

ApiRoutes.route('/policy-calc').get(policyCalculate);

module.exports = ApiRoutes;
