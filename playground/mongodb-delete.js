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

  // db.collection('Todos').deleteMany({text: 'eat lunh'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Isaac'}).then((result) => {
    console.log(`Deleted Duplicates by name GreeN: ${result.result.n}`);
  });

  db.collection('Users').findOne({name: 'Garet'}).then((docs)  => {
    var obj = new ObjectID(docs._id);

    db.collection('Users').findOneAndDelete({_id: obj}).then((result) => {
      console.log(result);
    });
  });
  // client.close();
});
