const express = require('express')

const Todo = require('../models/model')

const router = express.Router()

router.get('/todo/:id', (req, res) => {
  Todo.findById({'_id': req.params.id}, (err, todo) => {
    if (err) {
      res.status(400).json(err)
    }
    res.status(200).json(todo)
  })
})

router.get('/todo', (req, res, next) => {
  Todo.find({})
    .then(todo => {
      res.json({todo})
    })
    .catch(next)
})

router.post('/todo', (req, res) => {
  if (req.body.todo) {
    let newTodo = new Todo(req.body.todo)
    if (req.body.todo.text !== '' && req.body.todo.complete !== ''){
      newTodo.save()
        .then(todo => {
          res.json({todo})
        }, (err) => {
          res.status(400).json(err)
        })
    } else {
      console.log('todo err , field is empty : ',req.body.todo);
      res.status(400).json({success: false, message: 'Please fill in the fields'});
    }
  } else {
    res.status(400).json({success: false, message: 'body absent'});
  }
})


router.put('/todo/:id', function (req, res) {
  let todo = req.body.todo
  if (('text' in todo) && ('complete' in todo)) {
    Todo.findOneAndUpdate({'_id': req.params.id},
      {text: req.body.todo.text || '',
        complete: req.body.todo.complete || false
      },
      {new: true},
      function (err, todo) {
        if (err) {
          res.status(400).json(err)
        }
        res.status(200).json(todo)
      })
  } else {
    res.status(400).json({success: false, message: 'unacceptable changes'});
  }
})

router.delete('/todo/:id', function (req, res) {
  let id = req.params.id
  Todo.remove({
    _id: id
  }, function () {
    res.json()
  })
})

module.exports = router
