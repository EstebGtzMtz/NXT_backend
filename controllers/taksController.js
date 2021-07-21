const ToDo = require('../models/ToDo');
const DeletedToDo = require('../models/DeletedToDo');
const { getSunriseSunsetFromOpenWeatherAPI } = require('../helpers/openWeatherGet')

exports.newTasksPost = async(req, res) => {
    const { name, description = 'No description available' } = req.body;
    const { _id } = req.user;

    const { convertedSunrise: sunrise, convertedSunset: sunset } = await getSunriseSunsetFromOpenWeatherAPI();

    const task = new ToDo({
        name,
        description,
        userId: _id,
        sunrise,
        sunset
    });

    try {
        const newToDo = await task.save();
        res.status(200).json({ ok: true, newToDo })
    } catch (error) {
        return res.status(200).json({ ok: false, msg: 'Something went wrong !!' })
    }
}

exports.getAllTask = async(req, res) => {
    const { _id } = req.user;

    const results = await ToDo.find({ userId: _id })
        .populate('User', 'email')
        .exec()

    res.status(200).json({ ok: true, results });
}

exports.deleteToDo = async(req, res) => {
    const { _id } = req.params;

    try {
        const task = await ToDo.findByIdAndRemove(_id);
        const { name, description, sunrise, sunset } = task;
        setTimeout(async() => {
            const deletedTask = new DeletedToDo({ name, description, sunrise, sunset, status: 'aborted' })
            await deletedTask.save()
            res.status(200).json({ ok: true, task })
        }, 1000)
    } catch (error) {
        res.status(400).json({ ok: false, error })
    }
}

exports.completedTask = async(req, res) => {
    const { _id } = req.params

    await ToDo.findByIdAndUpdate(_id, { status: 'completed' }, { new: true });
    res.status(200).json({ ok: true, msg: 'Task completed' })

}