const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    task: String,
    time: String
});

model('Task', taskSchema);