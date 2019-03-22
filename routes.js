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

routes.put('/api/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const uptadedProject = req.body;

    uptadedProject.name && uptadedProject.description
    ? projects.update(id, uptadedProject)
        .then(project => {
            project
            ? res.json(project)
            : next({
                status: 404,
                message: "A projects with that Id does not exists!"
            })
        .catch(err => {
            next({
                status: 500,
                message: "The requested project could not be updated!"
            })
        })
        })
    : next({
        status: 400,
        message: "Please provide a name and a description to the project!" 
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

routes.put('/api/actions/:id', (req, res, next) => {
    const { id } = req.params;
    const uptadedAction = req.body;
    const validActionLength = uptadedAction.description.length < 129;
    uptadedAction.project_id && uptadedAction.description && uptadedAction.notes
    ?   validActionLength
        ? actions.update(id, uptadedAction)
        .then(action => {
            action
            ? res.json(action)
            : next({
                status: 404,
                message: "An action with that Id does not exists!"
            })
        .catch(err => {
            next({
                status: 500,
                message: "The requested action could not be updated!"
            })
        })
        })
        : next({
            status: 400,
            message: "The description for an action cannot be more then 128 characters!"
        })
    : next({
        status: 400,
        message: "Please provide a project Id, a description and notes to the action!" 
    })
})

routes.use(errors.error);

module.exports = routes;