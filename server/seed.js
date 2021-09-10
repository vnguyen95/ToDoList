const mongoose = require('mongoose');

require('./models/task');

const dbURL = 'mongodb://127.0.0.1/tasks';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!");
    })
    .catch((e) => {
        console.log("MONGO CONNECTION ERROR!");
        console.log(e);
    })

const Task = mongoose.model('Task');

const seedDB = async () => {
    const task1 = new Task({
        task: "Exercise at home",
        time: "9am"
    })
    await task1.save();
    const task2 = new Task({
        task: "Work on Leetwork",
        time: "11am"
    })
    await task2.save();
    const task3 = new Task({
        task: "Go to skateboard store",
        time: "2pm"
    })
    await task3.save();
    const task4 = new Task({
        task: "Get groceries",
        time: "4pm"
    })
    await task4.save();
}

seedDB().then(() => {
    console.log('Successfully seeded data!');
    mongoose.connection.close();
})