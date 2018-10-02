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



  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5bb38e04226d7a04fc004990')
  // },{
  //   $set: {
  //     a: true
  //   }
  // },{
  //   returnOriginal: false
  // }
  //   ).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5bb3d2458f866a1f983cf9f5')
  },{
    $inc: {
      age: 5
    }, 
      $set: {
        name: 'BROberto'
      }
  },{
    returnOriginal: false
  }
    ).then((result) => {
    console.log(result);
  });
  // client.close();
});
