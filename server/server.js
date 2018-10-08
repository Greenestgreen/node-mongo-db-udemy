var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mangoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res ) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(404).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send('ID not valid');
  }

  Todo.findById(id).then((todo) => {
    if (todo) {
        res.send({todo});
    } else {
      res.status(404).send('Not found')
    }

  }, (e) => {
    res.status(404).send('Empty body back');
  })
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send('ID not valid');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (todo) {
      res.send({todo});
    } else {
      res.status(404).send('Not Found');
    }
  }, (e) => {
      res.status(404).send('Error');
    })
  });


app.listen(port, () => {
  console.log(`Started at ${port}`);
})

module.exports = {
  app
}
