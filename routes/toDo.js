const router = require('express').Router();

const { verifyToken } = require('../middleware/authentication');
const { newTasksPost, getAllTask, deleteToDo, completedTask, abortedTask } = require('../controllers/taksController')

router.post('/newTask', verifyToken, newTasksPost);

router.get('/getAllTaskByUser', verifyToken, getAllTask);

router.delete('/deleteTask/:_id', verifyToken, deleteToDo);

router.post('/completedTask/:_id', completedTask);

router.post('/abortedTask/:_id', verifyToken, abortedTask);

module.exports = router;