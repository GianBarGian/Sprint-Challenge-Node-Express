function checkActionBody(req, res, next) {
    const action = req.body;
    const validActionLength = action.description.length < 129;

    action.project_id && action.description && action.notes
    ?   validActionLength
        ? next()
        : next({
            status: 400,
            message: "The description for an action cannot be more then 128 characters!"
        })
    : next({
        status: 400,
        message: "Please provide a project Id, a description and notes to the action!" 
    })
}

function checkProjectBody(req, res, next) {
    const project = req.body;

    project.name && project.description
    ? next()
    : next({
        status: 400,
        message: "Please provide a name and a description to the project!" 
    })
}

module.exports = {
    checkActionBody,
    checkProjectBody,
}