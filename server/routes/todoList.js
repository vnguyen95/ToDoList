const { model } = require('mongoose');
const todoListRouter = require('express').Router();

// const Task = model('Task');
const ToDoList = require('../models/todolist.js');

todoListRouter.get('/', async (req, res) => {
    const lists = await ToDoList.find({});
    res.send(lists);
})

todoListRouter.get('/:listId', async (req, res) => {
    console.log("get a list!");
    const { listId } = req.params;
    const list = await ToDoList.findById(listId);
    console.log(list);
    res.send(list);
})

todoListRouter.post('/', async (req, res) => {
    // console.log(req.body);
    // const { title, author, date, tasks, count } = req.body;
    const newList = await new ToDoList(req.body);
    await newList.save();
    res.send(newList);
})

todoListRouter.patch('/:listId', async (req, res) => {
    console.log("update route!")
    const { listId } = req.params;
    console.log(req.body);
    const list = await ToDoList.findByIdAndUpdate(listId, { ...req.body });
    console.log(list);
})

todoListRouter.delete('/:listId', async (req, res) => {
    console.log("delete route!")
    const { listId } = req.params;
    // console.log(listId);
    const list = await ToDoList.findByIdAndDelete(listId);
    console.log(list);
})

module.exports = todoListRouter;