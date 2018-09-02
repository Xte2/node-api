require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {moongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const {autenticate} = require('./middleware/autenticate');


var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  },(e) => {
      res.status(400).send(e);
  });

});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/1221313232
app.get('/todos/:id', (req, res) => {

  var id = req.params.id;


  if (!ObjectID.isValid(id)){
    return  res.status(404).send();
  }

  Todo.findById(id).then((todo) =>{
    if (!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  },
  (e) =>{
    res.status(400).send(e);
  });


  //Valid id using isValid
    //404 - send back empty send

  //findById
    //Success
      // if todo - send it back
      // if no todo - send back 404 with empty body
    //error
    //400 - and send empty body back

});

app.delete('/todos/:id', (req,res) =>{
  //get id

  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //validate the id -> not valid? return 404

  Todo.findByIdAndRemove(id).then((todo) => {
    //console.log(todo);

    if (!todo){
      return res.status(404).send();
    }

    res.status(200).send({todo});
  },
  (e) =>{
    res.status(400).send();
  });

  //remove todo by id
    //Success
      //if no doc, send 404
      //if doc send doc back and return 200
    //Error
      //400 with empty oody
});

app.patch('/todos/:id',(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo) => {
    //console.log(todo);

    if (!todo){
      return res.status(404).send();
    }

    res.status(200).send({todo});
  },
  (e) =>{
    res.status(400).send();
  });

});

//POST /Users
app.post('/users', (req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(()=> {
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });

});

app.get('/users/me', autenticate, (req,res)=>{
  res.send(req.user);
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
