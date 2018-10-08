// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp')

  // db.collection('Todos').find({
  //   _id: new ObjectID('5bb38e04226d7a04fc004990')
  // }).toArray().then((docs) => {
  //   console.log('TODOS');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

//   db.collection('Todos').find()
// .count().then((count) => {
//     console.log(`TODOS count: ${count}`);
//   }, (err) => {
//     console.log('Unable to fetch todos', err);
//   });

  db.collection('Users').find({name: 'GreeN'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2 ));
  });


  // client.close();
});
