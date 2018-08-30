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

  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch todos',err);
  // });


  //query by property completed
  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch todos',err);
  // });


  //query by id
  // db.collection('Todos').find({_id: new ObjectID('5b87f09c36ca273bd4fb461c')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch todos',err);
  // });

  //count the number of todos collection
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  //   //console.log(JSON.stringify(docs, undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch count',err);
  // });

  //count the number of users with name Andrew
  db.collection('Users').find({name: 'Andrew Mead'}).count().then((count) => {
    console.log(`Users 'Andrew Mead' count: ${count}`);
    //console.log(JSON.stringify(docs, undefined,2));
  }, (err) => {
    console.log('Unable to fetch count',err);
  });


  client.close();

});
