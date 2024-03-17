var express = require("express");
const mysql = require('mysql');
var router = express.Router();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

router
    .get('/', (req, res) => {
        let sql = 'SELECT * FROM todos';
        db.query(sql, (err, results) => {
            if(err) throw err;
            res.render('index', { todos: results });
        });
    })
    .get('/create', (req, res) => {
        res.render('create');
    })
    .post('/store', (req, res) => {
        let todo = {title: req.body.title, completed: false};
        let sql = 'INSERT INTO todos SET ?';
        db.query(sql, todo, (err, result) => {
            if(err) throw err;
            res.redirect('/');
        });
    })
    .get('/edit/:id', (req, res) => {
        let sql = `SELECT * FROM todos WHERE id = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.render('edit', { todo: result[0] });
        });
    })
    .post('/update/:id', (req, res) => {
        let completed = req.body.completed ? 1 : 0;
        let sql = `UPDATE todos SET title = "${req.body.title}", completed = ${completed} WHERE id = ${req.params.id}`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.redirect('/');
        });
    })

module.exports = router;