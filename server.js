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

function menu() {
    inquirer
        .prompt([
            {

                type: 'list',
                name: 'options',
                message: 'Select one of the following options:',
                choices:
                    [
                        'View all departments', 
                        'View all roles', 
                        'View all employees',
                        'Add a department', 
                        'Add a role', 
                        'Add an employee',
                        'Update an employee role', 
                        'Exit'
                    ]
            }
        ])
        .then((data) => {
            switch (data.choices) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmp();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;
                case 'Exit':
                    console.log("Your changes have been made.")
            }
        });
}
menu();
