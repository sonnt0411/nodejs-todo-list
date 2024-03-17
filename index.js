// Step 1 & 2: Initialize project and install packages
// Run these commands in your terminal
// npm init -y
// npm install express mysql body-parser
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const router = require("./router")

const app = express();

// Step 3: Setup MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen('3000', () => {
    console.log('Server started on port 3000');
});