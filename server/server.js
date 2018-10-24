require('./config/config.js')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mangoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

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
  return  res.status(404).send('ID not valid');
  }

  Todo.findById(id).then((todo) => {
    if (todo) {
    return    res.send({todo});
    } else {
      return res.status(404).send('Not found');
    }

  }, (e) => {
    return res.status(404).send('Empty body back');
  })
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID not valid');
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if (todo) {
      return res.send({todo});
    } else {
      return res.status(404).send('Not Found');
    }
  }, (e) => {
      return res.status(404).send('Error');
    })
  });

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text'], ['completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID not valid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completed = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

app.post('/users', (req, res) => {
  var user  = new User(_.pick(req.body, ['email'], ['password']));

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email'], ['password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started at ${port}`);
})

module.exports = {
  app
}
