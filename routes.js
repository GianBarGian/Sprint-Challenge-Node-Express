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

routes.delete('/api/projects/:id', (req, res, next) => {
    const { id } = req.params;

    projects.remove(id)
        .then(removed => {
            removed
            ? res.json({
                message: `project ${id} deleted correctly.`
            })
            : next({
                status: 404,
                message: "A projects with that Id does not exists!"
            })
        })
        .catch(err => {
            next({
                status: 500,
                message: "The requested project could not be deleted!"
            })
        })
})


//ACTIONS REQUESTS

routes.get('/api/actions', (req, res, next) => {
    actions.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(err => {
            next({
                status: 500,
                message: "Sorry, could not get actions!"
            })
        })
})

routes.delete('/api/actions/:id', (req, res, next) => {
    const { id } = req.params;

    actions.remove(id)
        .then(removed => {
            removed
            ? res.json({
                message: `action ${id} deleted correctly.`
            })
            : next({
                status: 404,
                message: "An action with that Id does not exists!"
            })
        })
        .catch(err => {
            next({
                status: 500,
                message: "The requested action could not be deleted!"
            })
        })
})

routes.use(errors.error);

module.exports = routes;