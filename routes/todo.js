const express = require('express');
const router = express.Router();

const { connection } = require('../config/database');

router.get('/edit/:id', (req, res) => {
  let todo_Id = req.params.id;

  let sql = `SELECT * FROM todos
           WHERE todo_Id = ?`;

  let data = [todo_Id];

  connection.query(sql, data, (err, result) => {
    if (err) {
      res.redirect('/');

      throw err;
    }

    result.forEach(function(todo) {
      if (todo.is_completed == 1) {
        todo.is_completed = true;
      } else {
        todo.is_completed = false;
      }
    });

    res.render('todos/edit', {
      todo: result[0]
    });
  });
});

router.post('/edit/:id', (req, res) => {
  let todo_Id = req.params.id;
  let todo_title = req.body.todo_title.trim();
  let todo_body = req.body.todo_body.trim();
  let is_completed = req.body.is_completed;

  if (is_completed == 'on') {
    is_completed = 1;
  } else {
    is_completed = 0;
  }

  let sql = `UPDATE todos
           SET todo_title = ?, todo_body = ?, is_completed = ?
           WHERE todo_Id = ?`;

  let data = [todo_title, todo_body, is_completed, todo_Id];

  connection.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    }

    res.redirect('/');
  });
});

router.get('/delete/:id', (req, res) => {
  let todo_Id = req.params.id;

  let sql = `DELETE FROM todos WHERE todo_Id = ?`;

  let data = [todo_Id];

  connection.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    }

    res.redirect('/');
  });
});

router.get('/add', (req, res) => {
  res.render('todos/add', {});
});

router.post('/add', (req, res) => {
  let todo_title = req.body.todo_title.trim();
  let todo_body = req.body.todo_body.trim();
  let is_completed = req.body.is_completed;

  if (is_completed == 'on') {
    is_completed = 1;
  } else {
    is_completed = 0;
  }

  let sql =
    "INSERT INTO todos (todo_title, todo_body, is_completed) VALUES ('" +
    todo_title +
    "', '" +
    todo_body +
    "', '" +
    is_completed +
    "')";

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.redirect('/');
  });
});

module.exports = router;
