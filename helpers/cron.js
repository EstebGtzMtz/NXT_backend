const cron = require('node-cron');
const router = require('express').Router();
const ToDo = require('../models/ToDo');


const getUncompletedTask = async() => {
    const todos = await ToDo.find({ status: 'toDo' }).exec();
    todos.map(async el => {
        await ToDo.findByIdAndUpdate(el._id, { status: 'aborted' }, { new: true })
    })
}

exports.cronToDeleteEveryFiveMinutes = () => {
    cron.schedule('5 * * * *', () => {
        console.log('running a task every 5 minutes');
        try {
            getUncompletedTask();
        } catch (error) {
            console.log(error)
        }
    })
}