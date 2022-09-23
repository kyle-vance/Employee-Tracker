const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Irf0rce",
    database: "tracker_db"
},
console.log("Employee Tracker Database loaded")
);
db();