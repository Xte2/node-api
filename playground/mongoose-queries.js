const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
//const {Todo} = require('./../server/models/todo');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



// var id = '5b89122c95917e2cfc408f92';
//
// if (!ObjectID.isValid(id)){
//   console.log('Id is not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) =>{
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) =>{
//   console.log('Todo',todo);
// });

// Todo.findById(id).then((todo) =>{
//   if (!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo',todo);
// });

User.findById("5b8829b8f04f972634aa95e5aaa").then((user) =>{
  if (!user){
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user,undefined,2));
},
(e) =>{
  console.log(e);
});
