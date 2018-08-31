var express = require('express');
var bodyParser = require('body-parser');

var {moongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');


var app = express();

const port = process.env.PORT || 3000;

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
    return res.status(404);
  }

  Todo.findById(id).then((todo) =>{
    if (!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  },
  (e) =>{
    res.status(400).send();
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

  debugger;

  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404);
  }

  //validate the id -> not valid? return 404

  Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);

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


//GET /todos/23123ddqsd

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
