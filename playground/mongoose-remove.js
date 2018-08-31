const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
//const {Todo} = require('./../server/models/todo');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({_id:'5b8958243355f88ef1aaf601'}).then((todo) => {
  console.log(todo);
});

///Todo.findOneAndRemove({}
Todo.findByIdAndRemove('5b8958243355f88ef1aaf601').then((todo) => {
  console.log(todo);
});
