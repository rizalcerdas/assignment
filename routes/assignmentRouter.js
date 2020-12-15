const express = require('express')
const router = express.Router()

const assignmentController = require('../controllers/assignmentController')

router.get('/', assignmentController.index)
router.post('/show', assignmentController.show)
router.post('/store', assignmentController.store)
router.post('/update', assignmentController.update)
router.post('/delete', assignmentController.destroy)

module.exports = router