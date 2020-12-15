const Assignment = require('../models/assignment');

//show List Assignment
const index = (req, res, next) => {
    Assignment.find()
    .them(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//show single assignment
const show = (req, res, next) => {
    let assignmentID = req.body.assignmentID;
    Assignment.findById(assignmentID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//add assignment
const store = (req, res, next) => {
    let assignment = new Assignment({
        name: req.body.name,
        description: req.body.description,
        expired: req.body.expired,
        files: req.body.files
    })
    assignment.save()
    .then(response => {
        res.json({
            message: 'Assignment Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//update assignment
const update = (req, res, next) => {
    let assignmentID = req.body.assignmentID

    let updateData = {
        name: req.body.name,
        description: req.body.description,
        expired: req.body.expired,
        files: req.body.files
    }

    Assignment.findByIdAndUpdate(assignmentID, {$set: updateData})
    .them(() => {
        res.json({
            message: 'Assignment update successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//delete an assignment
const destroy = (req, res, next) => {
    let assignmentID = req.body.assignmentID
    Assignment.findOneAndRemove(assignmentID)
    .then(() => {
        req.json({
            message: 'Assignment deleted succesfully!'
        })
    })
    .catch(error => {
        req.json({
            message: 'An error Occured!'
        })
    })
}

module.exports= {
    index, show, store, update, destroy
}