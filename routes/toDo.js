const router = require('express').Router();

const { verifyToken } = require('../middleware/authentication');
const { newTasksPost, getAllTask, deleteToDo, completedTask } = require('../controllers/taksController')

router.post('/newTask', verifyToken, newTasksPost);

router.get('/getAllTaskByUser', verifyToken, getAllTask);

router.delete('/deleteTask/:_id', verifyToken, deleteToDo);

router.post('/completedTask/:_id', completedTask);

module.exports = router;