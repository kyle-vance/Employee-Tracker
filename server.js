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
// Establish connection
db.connect(function (err) {
    if (err) throw err;
    menu();
});

// Nain menu function
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

// View departments
function viewDepartments() {
    db.query('SELECT * FROM department', (err, data) => {
        console.log(db.query)
        if (err) throw err;
        console.table(data);
        menu();
    });
}
// View roles
function viewRoles() {
    db.query('SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role JOIN department ON role.department_id = department.id', (err, data) => {
        if (err) throw err;
        console.table(data);
        menu();
    });
}
// View employees
function viewEmployees() {
    db.query(
        "SELECT employee.id AS ID, employee.first_name AS First, employee.last_name as Last, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id", (err, data) => {
            if (err) throw err;
            console.table(data);
            menu();
        });
}
// Add department
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Enter the name of the department."
            }
        ]).then((data) => {
            db.query(
                'INSERT INTO department VALUES (DEFAULT, ?)', [data.department],
                console.log(`You have added ${data.department}.`),
                menu()
            );
        });
}
// Add role
function addRole() {
    db.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Enter the name of the new role."
                },
                {
                    name: "salary",
                    type: "number",
                    message: "Enter the salary of this role.",
                },
                {
                    name: "deptartment_id",
                    type: "list",
                    message: "Enter the department ID for this role.",
                    choices: () => {
                        const departmentsArray = [];
                        for (const departments of data) {
                            departmentsArray.push(departments.id);
                        }
                        return departmentsArray;
                    }
                }

            ]).then((data) => {
                db.query(
                    'INSERT INTO role SET ?',
                    {
                        title: data.title,
                        salary: data.salary,
                        department_id: data.deptartment_id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log(`You have added ${data.title}.`),
                            menu()
                    }
                );
            });
    });
}

function addEmployee() {
    db.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "Enter the employee's first name."
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "Enter the employee's last name.",
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "Enter employee's role ID.",
                    choices: () => {
                        const roleArray = [];
                        for (const roleId of data) {
                            roleArray.push(roleId.id)
                        }
                        return roleArray;
                    }
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Enter the employee's manager ID.",
                    choices: [1, 2, 3, 4]
                }

            ]).then((data) => {
                db.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        role_id: data.role_id,
                        manager_id: data.manager
                    },
                    console.log(`You have added ${data.first_name} ${data.last_name}.`),
                    menu()
                );
            });
    });
}

// Update Function
function updateEmployee() {
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "list",
                    message: "Select an employee's to update their role.",
                    choices: () => {

                        const nameArray = [];
                        for (const last_name of data) {
                            nameArray.push(last_name.last_name);
                        }
                        return nameArray;
                    }
                },
                {
                    name: "title",
                    type: "list",
                    message: "Enter the role ID of this employee.",
                    choices: () => {
                        const roleArray = [];
                        for (const role of data) {
                            roleArray.push(role.role_id);
                        }
                        return roleArray;
                    }
                }
            ]).then((data) => {
                let last_name = data.name;
                db.query(
                    "UPDATE employee SET ? WHERE last_name = ?",
                    [
                        {
                            role_id: data.title
                        }, last_name
                    ],
                    console.log(`You have updated ${last_name}'s role.`),
                    menu()
                );
            });
    });
}


// app.listen(PORT, () => {
//     console.log(`Server live on port ${PORT}.`);
// });
