const express = require('express');
const app = express();
const path = require('path');
const taskController = require('../server/controllers/taskController')
const authController = require('../server/controllers/authController')

const cookieParser = require('cookie-parser');

const PORT = 3333;

// parse through json payloads
app.use(express.json()); 

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true })); 

// parses incoming cookies
app.use(cookieParser());

// serve the index.html in views folder
app.use(express.static(path.join(__dirname, '..', 'views')));

// serve the JS and CSS files 
app.use(express.static(path.join(__dirname, '..', 'assets')));

app.use('/signin', authController.loginVerifier, authController.setCookie, (req, res) => {
  // console.log('signin executed');
  return res.redirect('/secret')
});

// get all tasks
app.get('/get', taskController.getTask, (req, res) => {
  console.log('get executed');
  return res.status(200).json(res.locals.msgs);
});

// create a new task
app.post('/post', taskController.postTask, (req, res) => {
  console.log('post executed');
  return res.status(200).send(res.locals.msgs);
});

// delete a task
app.delete('/delete', taskController.deleteTask,  (req, res) => {
  return res.status(200).send(res.locals.msgs);
});

// when sent to /secret, serve the secret.html
app.get('/secret',authController.checkCookie, (req, res) => {
  // console.log('shhhhh')
  res.sendFile('secret.html', {
    root: path.resolve(__dirname, '../views'),
  });
});

// global error handler
app.use((err, req, res, next) => {
  const defErr = {
    log: 'sent to the global error handler',
    status: 500,
    msg: {err: 'error in server'}
  };
  const errorObj = Object.assign(defErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.msg);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app; 