const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./models/todolist');//for todoListRouter to use

const dbURL = 'mongodb://127.0.0.1/toDoList';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!");
    })
    .catch((e) => {
        console.log("MONGO CONNECTION ERROR!");
        console.log(e);
    })

const todoListRouter = require('./routes/todoList');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/api/todolist', todoListRouter);

app.get('/', (req, res) => {
    res.send('Welcome!');
})

app.listen('8080', (req, res) => {
    console.log('Listening on port 8080');
})