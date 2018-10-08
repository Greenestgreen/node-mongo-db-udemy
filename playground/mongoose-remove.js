const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });
//
// Todo.findOneAndRemove({}).then((result) => {
//
// });

Todo.findByIdAndRemove('5bbb57a1ecac413384b301f5').then((todo) => {
  console.log(todo);
});
