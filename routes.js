const express = require('express');
const project = require('./data/helpers/projectModel');
const action = require('./data/helpers/actionModel');

const routes = express.Router();

routes.use(express.json());

module.exports = routes;