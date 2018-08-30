//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

console.log(obj);

// var user = {name: 'andrew', age:25};
// var {name}  = user;

//console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
  if (err){
    console.log('Unable to connect to MongoDB server');
  }

  const db = client.db('TodoApp');

  console.log('Connected to MonggoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // },(err, result) => {
  //   if (err){
  //     return console.log('Unable to insert todo',err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   //_id: 123,
  //   name: 'Andrew Mead',
  //   agr: 25,
  //   location: 'Teste'
  // },(err, result) => {
  //   if (err){
  //     return console.log('Unable to insert Users',err);
  //   }
  //
  //   //console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();

});
