const { Schema, model } = require('mongoose');

const ToDoListSchema = new Schema({
    title: String,
    author: String,
    date: String,
    tasks: [String],
    count: Number,
})

module.exports = model('ToDoList', ToDoListSchema);