const express = require('express');
const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');
const errors = require('./Middlewares/errors');

const routes = express.Router();

routes.use(express.json());

//PROJECT REQUESTS

routes.get('/api/projects', (req, res, next) => {
    projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => next({
            status: 500,
            message: "Sorry, could not get projects!"
        }))
})

routes.use(errors.error);

module.exports = routes;