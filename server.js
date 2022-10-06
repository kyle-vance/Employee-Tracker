const mysql = require('mysql2');
require('console.table');
const inquirer = require('inquirer');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Irf0rce",
    database: "tracker_db"
},
    console.log("Employee Tracker Database loaded"),
);

db.connect(function (err) {
    if (err) throw err;
    menu();
});


function menu() {
    inquirer
        .prompt([
            {

                type: 'list',
                name: 'action',
                message: 'Select one of the following options:',
                choices:
                    [
                        'View all departments',
                        'View all roles',
                        'View all employees',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee',
                        'Exit'
                    ]
            }
        ])
        .then((data) => {
            switch (data.action) {
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
                    addEmployee();
                    break;
                case 'Update an employee':
                    updateEmployee();
                    break;
                case 'Exit':
                    console.log("Your changes have been made.")
            }
        });
}


function viewDepartments() {
    db.query('SELECT * FROM department', (err, data) => {
        console.log(db.query)
        if (err) throw err;
        console.table(data);
        menu();
    });
}

function viewRoles() {
    db.query('SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role JOIN department ON role.department_id = department.id', (err, data) => {
        if (err) throw err;
        console.table(data);
        menu();
    });
}

function viewEmployees() {
    db.query(
        "SELECT employee.id AS ID, employee.first_name AS First, employee.last_name as Last, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id", (err, data) => {
            if (err) throw err;
            console.table(data);
            menu();
        });
}
