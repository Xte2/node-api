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

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5b8801463355f88ef1aab2b0")},
  //   {
  //     $set: {
  //       completed: false
  //     }
  //   },
  //   {
  //       returnOriginal: false
  //   }).then((result) => {
  //   console.log(result);
  // });

  //Challenge#1

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5b87f23d875ed207bc273d75")},
    {
      $set: {
        name: 'Nuno Teles'
      },
      $inc: {
        agr: 1
      }
    },
    {
        returnOriginal: false
    }).then((result) => {
    console.log(result);
  });


  client.close();

});
